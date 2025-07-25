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
            <div v-for="(item,i) in demo" class="item item-component pointer" @click="createDemo(item)">
              Demo{{ i + 1 }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-aside>

    <!-- 画布 -->
    <el-main class="canvas">
      <el-header height="50px">
        <headerComponent :json="schema.components" ref="headerRef" @on-drag-drop="handleDragDrop"
                         @clear-all="clearAll"></headerComponent>
      </el-header>
      <div class="canvas-content">
        <div v-if="isMask" class="mask"></div>
        <div id="canvas-drop"></div>
      </div>
    </el-main>

    <!-- 设置项 -->
    <el-aside width="400px" class="editor-panel">
      <el-tabs v-model="activeName1" @tab-change="tabsChange">
        <el-tab-pane label="组件设置" name="first"></el-tab-pane>
        <el-tab-pane label="表单设置" name="form"></el-tab-pane>
        <el-tab-pane label="代码" name="second">
          <el-button type="primary" link @click="updateVueCode">生成代码</el-button>
          <el-button type="primary" link @click="copy">一键复制</el-button>
        </el-tab-pane>
      </el-tabs>
      <div :class="{'panel-content':activeName1 !== 'second','panel-code':activeName1 === 'second'}">
        <setComponent ref="setComponentRef" :formRef="formRef" :initSortable="initSortable"
                      v-show="activeName1 === 'first'"/>
        <setForm ref="setFormRef" v-show="activeName1 === 'form'" @inline-change="inlineChange"/>
        <div class="code-editor" ref="templateRef" v-if="activeName1 === 'second'"></div>
      </div>
    </el-aside>
  </el-container>
</template>

<script setup>
import {createApp, h, nextTick, onMounted, ref, watch} from 'vue';
import Sortable from 'sortablejs';
import * as ElementPlus from "element-plus";
import {zhCn} from "element-plus/es/locale/index";
import {Delete} from '@element-plus/icons-vue'
import {creatInitSortable, getSelectDOM, setSelectDOM} from "../utils/rendererUtils.js";
import {removeComponentById} from "../utils/findComponentById.js";
import {setData} from "../utils/setData.js";
import {createSortableManager, resetSortable} from "../utils/sortableManager.js";
import {createRenderer} from "../utils/renderComponent.js";
import {showToolbar} from "../utils/showToolbar.js";
import setComponent from '../components/setComponent';
import setForm from '../components/setForm.vue';
import headerComponent from '../components/headerComponent.vue'
import formStore from "../store/form.js";
import componentDataStore from "../store/componentData";
import componentMapStore from "../store/componentMap.js";
import teleportStore from "../store/teleport";
import divStylesStore from "@/store/divStyles.js";
import templateJson from "../assets/templates";
import demo from '../demo'
import {destroyVueCode, initVueCode} from "@/utils/initVueCode.js";
import {copyToClipboard} from "@/utils/copyToClipboard.js";

// 组件列表，用于左侧面板展示
const componentList = templateJson
const componentMap = {}
templateJson.forEach(item => {
  if (item.componentName) {
    componentMap[item.componentName] = item
  }
})

componentMapStore.SET_COMPONENT_MAP(componentMap)

const componentListRef = ref(null);
const headerRef = ref(null);
const setFormRef = ref(null);
const canvasRef = ref(null);
const formRef = ref(null);
const templateRef = ref(null);
const toolbarRef = ref(null);
const setComponentRef = ref(null);

const isMask = ref(false);
const activeName = ref("first");
const activeName1 = ref("first")

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
  const renderComponent = createRenderer({})
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
            if (formStore.formOptions.inline) evt.item.classList.add("inline-block");
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
      console.log(isExecuted, 'updated')
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
            model: formData,
            rules: rules,
            ...formStore.formOptions
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
  formStore.CLEAR_ALL()
  formStore.SET_FORM_OPTIONS_INIT(demoJSON.formOptions.inline)
  formStore.SET_FORM_OPTIONS(demoJSON.formOptions)
  setFormRef.value.init(formStore.formOptions)

  schema.value.components = JSON.parse(JSON.stringify(demoJSON.forms))
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
    destroyVueCode()
    vueView = null
  }
}

/**
 * 更新 Vue 代码
 */
function updateVueCode() {
  vueView = initVueCode(schema.value.components, templateRef)
}

/**
 * 复制代码
 **/
function copy() {
  copyToClipboard(vueView.state.doc.toString())
}

/**
 * @function inlineChange
 *
 * @param val - 要设置的值
 *
 * @description 当输入值变化时，调用此函数来更新内联样式并重置相关组件状态。
 *              如果 `val` 不为 `null`，则将 `inline` 设置为 `val`。
 *              然后获取选择框的 DOM 元素，如果存在，则移除其 `selected-component` 类，
 *              隐藏工具栏，并重置组件引用。
 */
function inlineChange(val = null) {
  if (val !== null) {
    formStore.SET_FORM_OPTIONS_INIT(val)
  }
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

  if (value.componentName === "ElUpload") {
    divStylesStore.DELETE_STYLES(`${value.children[0].props.class} ::v-deep(.el-icon)`)
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
  setFormRef.value.init(formStore.formOptions)
  inlineChange()
}
</script>

<style scoped lang="scss">
::v-deep(.drop-zone-box), .panel, .editor-panel {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  overflow: auto;
}

.panel {
  height: 100%;

  ::v-deep(.el-tabs) {
    height: 100%;

    .el-tabs__content, .el-tab-pane {
      height: 100%;
    }
  }
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
  max-height: calc(100% - 10px);
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

::v-deep(.el-dialog) {
  padding: 0 !important;

  .el-dialog__footer {
    padding: 15px;
    border-top: 1px solid #e5e7eb;
  }

  .el-dialog__header {
    padding: 15px;
    border-bottom: 1px solid #e5e7eb;
  }

  .el-dialog__body {
    padding: 15px
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
