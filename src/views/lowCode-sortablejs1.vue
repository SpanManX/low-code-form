<template>
  <el-container style="position: relative">
    <div class="toolbar" ref="toolbarRef">
      <el-icon class="delete" title="删除" @click="remove">
        <Delete/>
      </el-icon>
    </div>
    <!-- 左侧组件库 -->
    <el-aside width="300px" class="panel">
      <el-tabs v-model="activeName">
        <el-tab-pane label="组件库" name="first"></el-tab-pane>
        <el-tab-pane label="DEMO" name="second"></el-tab-pane>
      </el-tabs>
      <div ref="componentListRef" class="component-box">
        <template v-for="(component) in componentList">
          <div class="group-title" v-if="component.title">{{ component.title }}</div>
          <div v-else class="item"
               :data-component="component.componentName">
            <component v-if="component.icon" :is="component.icon"></component>
            {{ component.text }}
          </div>
        </template>
      </div>
    </el-aside>

    <!-- 画布 -->
    <el-main class="canvas">
      <el-header height="50px">
        <headerComponent :json="schema.components" @cancel-select="inlineChange"></headerComponent>
      </el-header>
      <div class="testbox"></div>
      <!--      <el-form ref="formRef" :inline="inline" :model="formData" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">-->
      <!--        <div ref="canvasRef" class="drop-zone-box" @click="handleClick">-->
      <!--        </div>-->
      <!--      </el-form>-->
    </el-main>

    <!-- 代码编辑器 -->
    <el-aside width="400px" class="editor-panel">
      <el-tabs v-model="activeName1" @tab-change="tabChange">
        <el-tab-pane label="组件设置" name="first"></el-tab-pane>
        <el-tab-pane label="表单设置" name="form"></el-tab-pane>
        <el-tab-pane label="代码" name="second">
          <el-button type="primary" link @click="updateVueCode">生成代码</el-button>
        </el-tab-pane>
      </el-tabs>
      <div :class="{'panel-content':activeName1 !== 'second','panel-code':activeName1 === 'second'}">
        <setComponent ref="setComponentRef" :formRef="formRef" :initSortable="initSortable"
                      v-show="activeName1 === 'first'"/>
        <setForm ref="setFormRef" v-show="activeName1 === 'form'" @changeAlignLabel="changeAlignLabel"
                 @changeLabelWidth="changeLabelWidth" @inline-change="inlineChange"/>
        <div class="code-editor" ref="templateRef" v-if="activeName1 === 'second'"></div>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup>
import {createApp, h, nextTick, onMounted, ref} from 'vue';
import Sortable from 'sortablejs';
import {basicSetup, EditorView} from 'codemirror'
import {vue} from '@codemirror/lang-vue'
import {html as beautifyHtml} from 'js-beautify'
import headerComponent from '../components/headerComponent.vue'
import {getSelectDOM, setSelectDOM, showToolbar} from "../utils/common.js";
import {removeComponentById} from "../utils/findComponentById.js";
import templateJson from "../assets/templates";
import {jsonToElementPlusTags} from "../utils/jsonToElementPlusTags.js";
import {setData} from "../utils/setData.js";
import {Delete} from '@element-plus/icons-vue'
import setComponent from '../components/setComponent';
import setForm from '../components/setForm.vue';
// import {formOptions} from "../store/form.js";
import formStore from "../store/form.js";
import {createSortableManager} from "../utils/sortableManager.js";
import componentDataStore from "../store/componentData";
import * as ElementPlus from "element-plus";
import {createRenderer} from "../utils/renderComponent.js";

// 组件列表，用于左侧面板展示
const componentList = templateJson
const componentMap = {}
templateJson.forEach(item => {
  if (item.componentName) {
    componentMap[item.componentName] = item
  }
})

// // 组件 schema 和代码
// const schema = ref({
//   components: []  // 顶级组件列表，支持嵌套 children
// });
// 激活的面板标签页
const activeName = ref("first");
const activeName1 = ref("first")
// DOM 引用
const componentListRef = ref(null);
const setFormRef = ref(null);
const canvasRef = ref(null);
const formRef = ref(null);
const templateRef = ref(null);
const toolbarRef = ref(null);
const setComponentRef = ref(null);
const inline = ref(false);
const formData = formStore.formData;
const rules = formStore.rules;
const labelPosition = ref("right")
const labelWidth = ref("auto")

// 构建 sortable 管理器
const {
  initSortable,
  schema,
} = createSortableManager({
  componentMap,
  formData,
  labelWidth,
  toolbarRef
})

// 初始化 SortableJS
onMounted(() => {
  const renderComponent1 = createRenderer(
      {
        formData,
        labelWidth,
      }
  )
  const app = createApp({
    mounted() {
      nextTick(() => {
        Sortable.create(componentListRef.value, {
          group: {
            name: 'shared',
            pull: 'clone',
            put: false
          },
          ghostClass: '.item',
          sort: false,
          animation: 150,
          setData: setData,
          onStart(evt) {
            if (inline.value) evt.item.classList.add("inline-block");
          },
          onEnd(evt) {
            evt.item.remove()
          }
        });
        nextTick(() => {
          initSortable({el: canvasRef.value})
        })
      })
    },
    render() {
      return h(
          ElementPlus['ElForm'],
          {
            ref: formRef,
            inline: inline.value,
            model: formData,
            rules: rules,
            labelWidth: labelWidth.value,
            labelPosition: labelPosition.value
          },
          {
            default: () => [
              h('div', {
                ref: canvasRef,
                class: 'drop-zone-box',
                onClick: handleClick
              }, {
                default: () => schema.value.components.map(item => {
                  componentDataStore.setComponentDataMap(item.id,item)
                  return renderComponent1(JSON.parse(JSON.stringify(item)))
                })
              })
            ]
          }
      )
    }
  })

  app.mount('.testbox')

})

let vueView = null;

function handleClick(e) {
  const container = e.target.closest('.drop-item')
  const prev = getSelectDOM()
  if (prev) {
    prev.classList.remove('selected-component')
  }
  console.log(container,'1111111111')
  if (!container) {
    inlineChange()
    return
  }

  setSelectDOM(container)

  container.classList.add('selected-component')

  const componentDataMap = componentDataStore.getComponentDataMap()

  setComponentRef.value.select(componentDataMap[container.dataset.id])
  // selectDataCallback()

  showToolbar(container, document.querySelector('.toolbar'))

  // e.preventDefault()
}

/**
 * 切换标签页时销毁编辑器
 */
function tabChange() {
  if (activeName1.value !== 'second' && vueView) {
    vueView.destroy()
    vueView = null
  }
}

/**
 * 更新 Vue 代码
 *
 * 使用指定的参数美化 HTML 字符串，并将其设置为 Vue 编辑器的文档内容。
 * 如果 Vue 编辑器尚未创建，则创建新的编辑器并将其添加到指定的父容器中。
 * 如果 Vue 编辑器已存在，则更新其文档内容。
 */
async function updateVueCode() {

  const {labelPosition, labelWidth} = formStore.formOptions

  const labelPositionJoin = labelPosition === 'right' || labelPosition === '' ? '' : `label-position="${labelPosition}"`
  const labelWidthJoin = labelWidth === 'auto' || !labelWidth ? '' : `label-width="${labelWidth}"`

  const htmlStr = beautifyHtml(
      `<template>
<div>
    <el-form :inline="${inline.value}" :model="formData" ${labelPositionJoin} ${labelWidthJoin}>
    ${(await jsonToElementPlusTags(JSON.parse(JSON.stringify(schema.value.components))))}
    </el-form>
</div>
</template>

<script setup>
<\/script>`,
      {indent_size: 4, wrap_line_length: 50, end_with_newline: true}
  )
  if (!vueView) {
    vueView = new EditorView({
      parent: templateRef.value,
      doc: htmlStr,
      extensions: [basicSetup, vue()]
    })
  } else {
    vueView.dispatch({
      changes: {
        from: 0,
        to: vueView.state.doc.length,
        insert: htmlStr
      }
    })
  }
}

/**
 * @function inlineChange
 *
 * @param {any} val - 要设置的值
 *
 * @description 当输入值变化时，调用此函数来更新内联样式并重置相关组件状态。
 *              如果 `val` 不为 `null`，则将 `inline.value` 设置为 `val`。
 *              然后获取选择框的 DOM 元素，如果存在，则移除其 `selected-component` 类，
 *              隐藏工具栏，并重置组件引用。
 */
function inlineChange(val) {
  if (val !== null) inline.value = val;
  const dom = getSelectDOM()
  if (dom) {
    dom.classList.remove('selected-component')
    toolbarRef.value.style.display = 'none';
    setComponentRef.value.reset()
  }
}

function remove() {
  const dom = getSelectDOM()
  dom.remove()
  removeComponentById(schema.value.components, dom.dataset.id)
  toolbarRef.value.style.display = 'none';

  setComponentRef.value.reset()
}

function changeAlignLabel(val) {
  labelPosition.value = val;
}

function changeLabelWidth(val) {
  labelWidth.value = !val ? 'auto' : `${val}px`;
  const dataMap = componentDataStore.getComponentDataMap()
  canvasRef.value.querySelectorAll('.el-form-item__label').forEach(el => {
    const data = dataMap[el.closest('[data-id]').dataset.id]
    if (!data.props['label-width']) {
      el.style.width = labelWidth.value
    }
  })
}
</script>

<style scoped lang="scss">
::v-deep(.drop-zone-box), .panel, .editor-panel {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  overflow: auto;

  ::v-deep(.el-form-item__label) {
    font-size: 13px;
  }
}

.testbox {
  height: calc(100% - 60px);
}

.el-aside {
  overflow: hidden;
}

.panel-content {
  height: calc(100% - 54px);
  overflow: auto;
}

.panel-code {
  height: calc(100% - 79px);


  .code-editor {
    height: 100%;
  }
}

.test {
  position: absolute;
  z-index: 100;
}

.component-box {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;

  .group-title {
    width: 100%;
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 10px;
    //color: #1f2937;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}

.item {
  width: calc(100% / 2 - 10px);
  //flex-shrink: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(243, 244, 246, 0.3); // 浅灰背景
  border: 1px solid #e5e7eb;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: grab;
  box-sizing: border-box;

  &:hover {
    background: #e0f2fe; // hover 浅蓝色
    border-color: #3b82f6;
    color: #1d4ed8;
  }

  &:active {
    cursor: grabbing;
    background: #bfdbfe;
  }

  svg {
    vertical-align: sub;
    width: 20px;
    height: 20px;
    fill: currentColor;
    margin-right: 5px;
  }
}

.canvas {
  padding: 0;
  position: relative;
}

.toolbar {
  position: absolute;
  z-index: 100;
  display: none;
  background: #409EFF;
  padding: 3px 15px;
  border-top-left-radius: 5px;
  //border-bottom-right-radius: 5px;

  .el-icon {
    cursor: pointer;
    margin: 0 5px;
  }

  .delete {
    color: #fff;
  }
}

::v-deep(.el-form) {
  //height: calc(100% - 60px);
  height: 100%;
}

::v-deep(.drop-zone-box) {
  height: 100%;
  margin: 0 10px;
  box-sizing: border-box;
}

:deep() {
  .cm-editor {
    height: 100%;
    overflow: auto;
  }

  .selected-component {
    outline: 2px solid #409EFF;
    border-radius: 5px;
    padding: 5px;
  }

  .el-form--label-left .el-form-item__label {
    text-align: left;
    justify-content: flex-start;
  }

  .el-form--label-top .el-form-item__label {
    display: block;
    height: auto;
    text-align: right;
    margin-bottom: 8px;
    line-height: 22px;
  }

  .el-header {
    padding: 0;
    margin: 0 10px 10px 10px;
  }

  .el-input-number {
    width: 100%;
  }

  .inline-block {
    display: inline-flex;
  }

  .el-form--inline .drop-item:not(.drop-item-tabs):not(.drop-item-card) {
    display: inline-flex;
  }

  .el-date-editor.el-input {
    width: 100%;
  }

  .form-item-tip {
    color: coral;
    cursor: pointer;
    align-self: center;
    margin-left: 5px;
  }

  .drop-zone {
    min-height: 50px;
    padding: 10px;
    border: 1px dashed #aaa;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .drop-item-tabs, .drop-item-card {
    width: 100%;
  }

  .drop-item {
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .drop-item-button {
    margin-right: 8px;
    margin-left: 8px;
  }

  .drop-zone-box .el-tabs__content {
    .el-tab-pane {
      min-height: 55px;
    }
  }
}
</style>
