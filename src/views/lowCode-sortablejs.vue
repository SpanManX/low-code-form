<template>
  <el-container style="position: relative">
    <teleport v-if="to" :to="to">
      <div class="toolbar" ref="toolbarRef">
        <el-icon class="delete" title="删除" @click="remove()">
          <Delete/>
        </el-icon>
      </div>
    </teleport>

    <!-- 左侧组件库 -->
    <el-aside width="300px" class="panel">
      <el-tabs v-model="activeName">
        <el-tab-pane label="组件库" name="first">
          <div ref="componentListRef" class="component-box">
            <template v-for="(component) in componentList">
              <div class="group-title" v-if="component.title">{{ component.title }}</div>
              <div v-else class="item item-component grab"
                   :data-component="component.componentName">
                <component v-if="component.icon" :is="component.icon"></component>
                {{ component.text || component.label }}
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="DEMOS" name="second">
          <div class="component-box">
            <div class="item item-component pointer" @click="createDemo(demo1)">
              Demo1
            </div>
            <div class="item item-component pointer" @click="createDemo(demo2)">
              Demo2
            </div>
            <div class="item item-component pointer" @click="createDemo(demo3)">
              Demo3
            </div>
            <div class="item item-component pointer" @click="createDemo(demo4)">
              demo4
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-aside>

    <!-- 画布 -->
    <el-main class="canvas">
      <el-header height="50px">
        <headerComponent :json="schema.components" @on-drag-drop="handleDragDrop"
                         @clear-all="clearAll"></headerComponent>
      </el-header>
      <div class="canvas-content">
        <div v-if="isMask" class="mask"></div>
        <div id="canvas-drop"></div>
      </div>
    </el-main>

    <!-- 代码编辑器 -->
    <el-aside width="400px" class="editor-panel">
      <el-tabs v-model="activeName1" @tab-change="tabsChange">
        <el-tab-pane label="组件设置" name="first"></el-tab-pane>
        <el-tab-pane label="表单设置" name="form"></el-tab-pane>
        <el-tab-pane label="代码" name="second">
          <el-button type="primary" link @click="updateVueCode">生成代码</el-button>
          <el-button type="primary" link @click="copyToClipboard">一键复制</el-button>
        </el-tab-pane>
      </el-tabs>
      <div :class="{'panel-content':activeName1 !== 'second','panel-code':activeName1 === 'second'}">
        <setComponent ref="setComponentRef" :initSortable="initSortable"
                      v-show="activeName1 === 'first'"/>
        <setForm ref="setFormRef" v-show="activeName1 === 'form'" @changeAlignLabel="changeAlignLabel"
                 @changeLabelWidth="changeLabelWidth" @inline-change="inlineChange"/>
        <div class="code-editor" ref="templateRef" v-if="activeName1 === 'second'"></div>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup>
import {createApp, h, nextTick, onMounted, ref, watch} from 'vue';
import Sortable from 'sortablejs';
import {basicSetup, EditorView} from 'codemirror'
import {vue} from '@codemirror/lang-vue'
import {html as beautifyHtml} from 'js-beautify'
import headerComponent from '../components/headerComponent.vue'
import {creatInitSortable, getSelectDOM, setSelectDOM} from "../utils/rendererUtils.js";
import {removeComponentById} from "../utils/findComponentById.js";
import templateJson from "../assets/templates";
import {jsonToElementPlusTags} from "../utils/jsonToElementPlusTags.js";
import {setData} from "../utils/setData.js";
import {Delete} from '@element-plus/icons-vue'
import setComponent from '../components/setComponent';
import setForm from '../components/setForm.vue';
import formStore from "../store/form.js";
import {createSortableManager, resetSortable} from "../utils/sortableManager.js";
import componentDataStore from "../store/componentData";
import componentMapStore from "../store/componentMap.js";
import teleportStore from "../store/teleport";
import demo1 from "../demo/demo1.js";
import demo2 from "../demo/demo2.js";
import demo3 from "../demo/demo3.js";
import demo4 from "../demo/demo4.js";
import {createRenderer} from "../utils/renderComponent.js";
import * as ElementPlus from "element-plus";
import {ElMessage} from "element-plus";
import {showToolbar} from "../utils/showToolbar.js";
import {zhCn} from "element-plus/es/locale/index";
import divStylesStore from "@/store/divStyles.js";

// 组件列表，用于左侧面板展示
const componentList = templateJson
const componentMap = {}
templateJson.forEach(item => {
  if (item.componentName) {
    componentMap[item.componentName] = item
  }
})

componentMapStore.SET_COMPONENT_MAP(componentMap)

const activeName = ref("first");
const activeName1 = ref("first")
const componentListRef = ref(null);
const setFormRef = ref(null);
const canvasRef = ref(null);
const formRef = ref(null);
const templateRef = ref(null);
const toolbarRef = ref(null);
const setComponentRef = ref(null);
const inline = ref(false);
const labelPosition = ref(formStore.formOptions.labelPosition)
const labelWidth = ref(formStore.formOptions.labelWidth)
const isMask = ref(false);

const formData = formStore.formData;
const rules = formStore.rules;
const to = ref(teleportStore.teleportTo.value);
let vueView = null;
let currentComponentData = null;
let isExecuted = false;

watch(teleportStore.teleportTo, (val) => {
  to.value = val;
})

// 构建 sortable 管理器
const {
  initSortable,
  schema,
} = createSortableManager()

// 初始化 SortableJS
onMounted(() => {
  const renderComponent = createRenderer()
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
          preventOnFilter: true,
          animation: 150,
          setData: setData,
          onStart(evt) {
            if (inline.value) evt.item.classList.add("inline-block");
            evt.item.classList.remove("item-component");
          },
          onEnd(evt) {
            if (evt.originalEvent.dataTransfer.getData('type') && !evt.to.classList.contains('component-box')) {
              evt.item.remove()
            } else {
              evt.item.classList.add("item-component");
            }
          }
        });
        nextTick(() => {
          initSortable({el: canvasRef.value})
        })
      })
    },
    updated() {
      console.log(isExecuted,'updated')
      if (isExecuted) {
        creatInitSortable(schema.value.components, initSortable)
        isExecuted = false;
      }
    },
    render() {
      const list = schema.value.components // 响应式依赖，用于触发 updated 生命周期
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
                default: () => list.map(item => {
                  componentDataStore.SET_COMPONENT_DATA_MAP(item.id, item)
                  return renderComponent(item)
                })
              })
            ]
          }
      )
    }
  }).use(ElementPlus, {locale: zhCn});

  app.mount('#canvas-drop')
})

/**
 * 处理点击事件
 *
 * @param e 事件对象
 */
function handleClick(e) {
  const container = e.target.closest('.drop-item')
  const prev = getSelectDOM()
  if (prev) {
    prev.classList.remove('selected-component')
  }
  if (!container) {
    inlineChange()
    return
  }
  setSelectDOM(container)
  container.classList.add('selected-component')
  const componentDataMap = componentDataStore.componentDataMap
  currentComponentData = componentDataMap[container.dataset.id]
  setComponentRef.value.select(componentDataMap[container.dataset.id])
  showToolbar(container)
}

/**
 * 创建一个示例，根据传入的 JSON 数据生成对应的 Vue 组件
 *
 * @param demoJSON {Object} - 一个包含 Vue 组件定义的 JSON 对象
 */
function createDemo(demoJSON) {
  resetSortable()
  isExecuted = true
  schema.value.components = JSON.parse(JSON.stringify(demoJSON))
}

/**
 * 处理拖拽事件，根据传入的值更新遮罩层的显示状态
 *
 * @param {boolean} val - 传入的值，用于控制遮罩层的显示状态
 */
function handleDragDrop(val) {
  isMask.value = val
}

/**
 * 切换标签页时销毁编辑器
 */
function tabsChange() {
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

  let str = ''
  Object.keys(divStylesStore.styles).forEach((key) => {
    str += `.${key}${divStylesStore.styles[key]}`
  })

  const htmlStr = beautifyHtml(
      `<template>
<div>
    <el-form :model="formData" :rules="rules" :inline="${inline.value}" ${labelPositionJoin} ${labelWidthJoin}>
    ${(await jsonToElementPlusTags(JSON.parse(JSON.stringify(schema.value.components))))}
    </el-form>
</div>
</template>
<script setup>
  import {ref} from 'vue';

  const rules = ${JSON.stringify(rules.value, null, 2)}
  const formData = ref(${JSON.stringify(formData.value, null, 2)})
<\/script>
<style scoped>
.el-tabs, .el-card, .el-table {
    margin-bottom: 10px;
}
${str}
</style>`,
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

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(vueView.state.doc.toString());
    ElMessage.success('复制成功');
  } catch (err) {
    ElMessage.error(`无法复制内容：${err}`);
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
function inlineChange(val = null) {
  if (val !== null) inline.value = val;
  const dom = getSelectDOM()
  if (dom) {
    dom.classList.remove('selected-component')
    teleportStore.SET_TELEPORT_TO(null);
    setComponentRef.value.reset()
  }
}

/**
 * 移除组件
 *
 * @param {Object} componentData - 要移除的组件数据
 */
function remove(componentData) {
  let value = componentData
  if (!componentData) {
    value = currentComponentData
    const dom = getSelectDOM()
    dom.remove()
    removeComponentById(schema.value.components, value.id)
    inlineChange()
  }

  delete componentDataStore.componentDataMap[value.id]
  if (value.children?.[0]) {
    delete componentDataStore.componentDataMap[value.children[0].id]
    // 删除 ElFormItem 对应的表单规则和表单数据
    if (value.componentName === "ElFormItem" || value.componentName === "ElTabs") {
      formStore.DELETE_FORM_DATA(value.props.prop || `field${value.id}`)
      formStore.DELETE_RULES(value.props.prop)
    }
  }

  if (value.componentName === "GridComponent" || value.componentName === "DivComponent") {
    divStylesStore.DELETE_STYLES(value.props.class)
  }

  if (value.children && value.children.length) {
    value.children.forEach(child => {
      remove(child)
    })
  }
}

/**
 * 清空所有表单项、组件和数据存储
 */
function clearAll() {
  schema.value.components = []
  formStore.CLEAR_ALL()
  componentDataStore.componentDataMap = {}
  inlineChange()
}

function changeAlignLabel(val) {
  labelPosition.value = val;
}

function changeLabelWidth(val) {
  labelWidth.value = !val ? 'auto' : `${val}px`;
}
</script>

<style scoped lang="scss">
::v-deep(.drop-zone-box), .panel, .editor-panel {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  overflow: auto;
}

.editor-panel {
  ::v-deep(.el-form-item__label) {
    font-size: 13px;
  }
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

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}

.grab {
  cursor: grab;
}

.pointer {
  cursor: pointer;
}

.item-component {
  width: calc(100% / 2 - 10px);
}

.item {
  display: inline-block;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(243, 244, 246, 0.3);
  border: 1px solid #e5e7eb;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  box-sizing: border-box;

  &:hover {
    background: #e0f2fe;
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
  background: #409EFF;
  padding: 3px 15px;
  border-top-left-radius: 5px;

  .el-icon {
    cursor: pointer;
    margin: 0 5px;
  }

  .delete {
    color: #fff;
  }
}

.canvas-content {
  height: calc(100% - 60px);
  position: relative;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }

  #canvas-drop {
    height: 100%;
  }
}


::v-deep(.el-form) {
  height: 100%;

  .drop-zone-box {
    height: 100%;
    margin: 0 10px;
    box-sizing: border-box;
  }
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

  //.el-form--label-left .el-form-item__label {
  //  text-align: left;
  //  justify-content: flex-start;
  //}

  //.el-form--label-top .el-form-item__label {
  //  display: block;
  //  height: auto;
  //  text-align: right;
  //  margin-bottom: 8px;
  //  line-height: 22px;
  //}

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

  .el-form--inline .drop-item:not(.drop-item-card):not(.drop-item-el-tabs):not(.drop-item-el-button):not(.drop-item-el-divider):not(.drop-item-div-component) {
    display: inline-flex;
  }

  .drop-item-el-button {
    display: inline-block;
  }

  .drop-item-el-button + .drop-item-el-button {
    margin-left: 12px;
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
    //.el-tabs, .el-card, .el-table {
    //  margin-bottom: 10px;
    //}
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

  .drop-item-grid-component {
    width: 100%;
  }
}
</style>
