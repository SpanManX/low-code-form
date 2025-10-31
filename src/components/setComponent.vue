<template>
  <div>
    <el-form label-width="90px">
      <el-divider v-show="isShow">
        <p>表单属性</p>
      </el-divider>
      <template v-if="isShow">
        <el-form-item label="标签文本">
          <el-input v-model="labelText" @change="labelTextChange"/>
        </el-form-item>
        <el-form-item>
          <template #label>
            标签宽度
            <el-icon class="form-item-tip" title="0 或空为 auto">
              <WarningFilled/>
            </el-icon>
          </template>
          <el-input-number :controls="false" v-model="labelWidth" :min="0" step-strictly :step="1"
                           @change="labelWidthChange"/>
        </el-form-item>
        <el-form-item label="是否必填">
          <el-switch v-model="required" @change="checkChange"/>
        </el-form-item>
        <el-form-item label="必填提示" v-if="required">
          <el-input v-model="currentData.props.rules.message"/>
        </el-form-item>
      </template>
      <el-divider v-show="configPropsList && configPropsList.length">
        <p>组件属性</p>
      </el-divider>
      <!-- 根据组件类型展示不同设置项 -->
      <template v-for="item in configPropsList">
        <el-form-item
            v-if="shouldShowItem(item)"
            :label="item.name">
          <template #label v-if="item.tip">
            {{ item.name }}
            <el-icon class="form-item-tip" :title="item.tip">
              <WarningFilled/>
            </el-icon>
          </template>
          <template v-if="item.values">
            <el-select v-model="useFormCurrentData.props[item.key]" placeholder="请选择"
                       @change="selectChange(useFormCurrentData.props[item.key],item.key,useFormCurrentData.componentName)"
                       :clearable="item.clearable">
              <el-option v-for="val in item.values" :value="val" :label="val"></el-option>
            </el-select>
          </template>
          <template v-else>
            <el-switch
                v-if="typeof item.value === 'boolean'"
                v-model="switchDynamicPropsModel(item)[item.key]"
                @change="switchChange(item.key,useFormCurrentData.props[item.key])"/>
            <el-input-number v-else-if="typeof item.value === 'number'"
                             v-model="numberDynamicPropsModel(item)[item.key]"
                             @change="inputNumberChange(item.key,numberDynamicPropsModel(item)[item.key])"
                             :min="0"/>
            <el-input v-else v-model="inputDynamicPropsModel(item)[item.key]" :placeholder="`请输入${item.name}`"
                      :clearable="item.clearable"/>
          </template>
        </el-form-item>
      </template>

      <div class="options" v-if="options.length">
        <el-divider>
          <p>{{ isTable ? '表头' : 'Options' }}</p>
        </el-divider>
        <ul>
          <li v-for="(item,i) in options">
            <el-form-item label="文本">
              <el-input v-model="inputs[i]" @change="textChange(inputs[i],i)"/>
            </el-form-item>
            <el-form-item label="值（value）" v-if="typeof item.value !== 'undefined'">
              <el-input v-model="item.value"/>
            </el-form-item>
            <template v-else-if="isTable">
              <el-form-item label="值（prop）">
                <el-input v-model="item.prop"/>
              </el-form-item>
              <el-form-item label="对齐方式">
                <el-select v-model="item.align" placeholder="请选择" clearable>
                  <el-option value="center" label="center"></el-option>
                  <el-option value="right" label="right"></el-option>
                  <el-option value="left" label="left"></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="值（name）" v-else-if="useFormCurrentData.componentName !== 'ElButton'">
              <el-input v-model="item.name" @change="nameChange(item.name,i)"/>
            </el-form-item>
            <div class="toolbar" v-if="options.length > 1">
              <el-icon class="delete" @click="removeOptions(i)" title="删除">
                <Delete/>
              </el-icon>
              <el-icon @click="moveUp(i)" v-if="i !== 0" title="上移">
                <Upload/>
              </el-icon>
              <el-icon @click="moveDown(i)" v-if="options.length - 1 !== i" title="下移">
                <Download/>
              </el-icon>
            </div>
          </li>
        </ul>
        <div>
          <el-button link type="primary" @click="add">增加</el-button>
          <!--          <el-button link type="primary">批量增加</el-button>-->
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup>
import {computed, nextTick, reactive, ref} from "vue";
import {Delete, Download, Upload, WarningFilled} from '@element-plus/icons-vue'
import * as configProps from "@/config/configProps.js";
import {getSelectDOM} from "../utils/rendererUtils.js";
import {showToolbar} from "../utils/showToolbar.js";
import {generateRandomId} from "../utils/generateRandomId.js";
import formStore from "../store/form.js";
import tableDataStore from "../store/tableData.js";

defineExpose({reset, select});

const props = defineProps({
  initSortable: Function,
  formRef: Object,
})

const labelText = ref('')
const labelWidth = ref(null)
const required = ref(false)
const currentData = ref(null)
const useFormCurrentData = ref(null)
const configPropsList = ref([])
const options = ref([])
const inputs = ref([])
const isTable = ref(false)

const joinTag = ['ElTabs']
const notGetChildren = ['ElCard', 'ElButton', 'ElDivider', 'GridComponent', 'DivComponent']

let isTabs = false

const isShow = computed(() => {
  if (currentData.value) return !currentData.value.noUseForm;
  else return false
})

const inputDynamicPropsModel = computed(() => {
  return (item) => {
    // 根据条件返回不同的对象
    if (useFormCurrentData.value.componentName === 'ElUpload') {
      if (item.name === '提示内容') {
        return useFormCurrentData.value.children[1].children[0];
      } else if (item.name === '按钮文字') {
        return useFormCurrentData.value.children[0];
      } else if (item.key === 'text') {
        return useFormCurrentData.value.children[0].props;
      } else if (item.key === 'color') {
        return useFormCurrentData.value.children[0].props.iconStyle;
      }
    } else if (useFormCurrentData.value.componentName === 'ElCard') {
      return useFormCurrentData.value.staticChildren[0].staticChildren[0];
    } else if (useFormCurrentData.value.componentName === 'ElButton' || useFormCurrentData.value.componentName === 'ElDivider') {
      return useFormCurrentData.value
    }
    // 默认情况
    return useFormCurrentData.value.props;
  };
});

const switchDynamicPropsModel = computed(() => {
  return (item) => {
    // 根据条件返回不同的对象
    if (useFormCurrentData.value.componentName === 'ElUpload' && item.key === 'text') {
      return useFormCurrentData.value.children[0].props;
    }
    // 默认情况
    return useFormCurrentData.value.props;
  };
});

const numberDynamicPropsModel = computed(() => {
  return (item) => {
    // 根据条件返回不同的对象
    if (useFormCurrentData.value.componentName === 'ElUpload' && item.key === 'fontSize') {
      return useFormCurrentData.value.children[0].props.iconStyle;
    }
    // 默认情况
    return useFormCurrentData.value.props;
  };
});

// 选中组件触发
function select(val) {
  isTable.value = val.componentName === 'ElTable'
  isTabs = val.componentName === 'ElTabs'
  configPropsList.value = []
  currentData.value = val
  useFormCurrentData.value = notGetChildren.indexOf(val.componentName) > -1 || isTable.value ? currentData.value : currentData.value.children[0]

  if (val.props) {
    labelText.value = val.props.label
    labelWidth.value = val.props['label-width']
    required.value = val.props.rules?.required || false
  }

  inputs.value = []  // 初始化 inputs 数组，用于存储输入框的值
  options.value = []  // 初始化options数组，用于存储选项数据

  // 如果有子组件，则设置 options 数据
  if ((val.children && val.children[0] && val.children[0]?.componentName !== 'ElUpload') && !val.parentId) {
    let arr
    if (joinTag.indexOf(val.componentName) > -1 || isTable.value) {
      arr = val.children
    } else if (val.componentName === 'ElFormItem') {
      arr = val.children[0].children
    }

    options.value = (arr || []).map((item, i) => {
      inputs.value[i] = item.props.label
      return item.props
    })
  }

  // 根据组件类型展示不同设置项
  if (isShow.value && val.children[0] || (notGetChildren.indexOf(useFormCurrentData.value.componentName) > -1 || isTable.value)) {
    configPropsList.value = configProps[`${useFormCurrentData.value.componentName}ConfigProps`]
  }
}

/**
 * 重置表单
 */
function reset() {
  labelText.value = ''
  required.value = false
  currentData.value = null
  configPropsList.value = []
  options.value = []
}

/**
 * 更新表格数据
 */
function updateTableData() {
  if (isTable) {
    tableDataStore.SET_TABLE_DATA(useFormCurrentData.value.props.data)
    tableDataStore.SET_TABLE_DATA_KEYS(currentData.value.children.map(item => item.props.prop))
  }
}

/**
 * 更新标签文本
 *
 * @param val 新标签文本内容
 */
function labelTextChange(val) {
  currentData.value.props.label = val
}

function labelWidthChange(val) {
  if (!val) {
    delete currentData.value.props['label-width']
  } else {
    currentData.value.props['label-width'] = Number(val)
  }
}

/**
 * 检查并更新当前数据的必需属性。
 *
 * 根据 required.value 的值更新 currentData.value.props 中的 'required' 属性。
 */
function checkChange() {
  if (!currentData.value?.props) {
    console.error(`currentData.value.props ${currentData.value?.props}`)
    return;
  }

  const firstChild = currentData.value.children?.[0];
  const fieldKey = `field${firstChild?.id}`;

  if (!required.value && formStore.rules.value[fieldKey]) {
    // delete useFormCurrentData.value.props.ruleMessage
    delete currentData.value.props.rules
    formStore.DELETE_FORM_DATA(fieldKey)
    formStore.DELETE_RULES(fieldKey)
    setTimeout(() => {
      props.formRef.resetFields()
    })
    return
  }

  if (required.value) {
    // if (!useFormCurrentData.value.props.ruleMessage) useFormCurrentData.value.props.ruleMessage = '该项为必填项!'
    currentData.value.props.rules = {
      required: required.value,
      // message: ()=> useFormCurrentData.value.props.ruleMessage,
      message: '该项为必填项!',
      trigger: firstChild.children ? 'change' : 'blur',
    }
    formStore.SET_FORM_RULES(fieldKey, JSON.parse(JSON.stringify(currentData.value.props.rules)))
    setTimeout(() => {
      props.formRef.resetFields()
    })
  }
}

function shouldShowItem(item) {
  const key = item.key
  const props = currentData.value?.children?.[0]?.props || {}

  // 处理 collapse-tags 等特殊依赖
  if (key === 'multiple-limit' || key === 'collapse-tags') {
    return props.multiple === true
  }

  if (key === 'unlink-panels' || key === 'range-separator') {
    return props.type === 'daterange' || props.type === 'datetimerange'
  }

  if (key === 'show-password') {
    return props.type === 'password'
  }

  if ((key === 'maxlength' || key === 'show-word-limit')) {
    return props.type === 'textarea'
  }

  // 默认返回 true（可展示）
  return true
}

let saveKey = ''

function selectChange(key, key1, name) {
  if (key === 'textarea' || saveKey === 'textarea') {
    saveKey = key
    // 更新 toolbar 坐标
    showToolbar(getSelectDOM())
    delete currentData.value.children[0].props['show-password']
    delete currentData.value.children[0].props['show-word-limit']
    delete currentData.value.children[0].props['maxlength']
    return
  }

  if (key === 'text' || key === 'password') {
    delete currentData.value.children[0].props['show-password']
    delete currentData.value.children[0].props['show-word-limit']
    delete currentData.value.children[0].props['maxlength']
    return;
  }

  if (key1 === 'type' && name === 'ElDatePicker') {
    formStore.SET_FORM_DATA([`field${currentData.value.children[0].id}`], null)
  }
}

function inputNumberChange(key, value) {
  if (isTable && key === 'rows') {
    const obj = {}
    useFormCurrentData.value.children.forEach(item => {
      obj[item.props.prop] = ''
    })

    for (let i = 0; i <= value - 1; i++) {
      useFormCurrentData.value.props.data.push({...obj})
    }

    updateTableData()
  }
}

function switchChange(key, bool) {
  if (key === 'collapse-tags') {
    if (typeof currentData.value.children[0].props['collapse-tags-tooltip'] === 'boolean' && !bool) {
      delete currentData.value.children[0].props['collapse-tags-tooltip']
      delete currentData.value.children[0].props['collapse-tags']
    } else {
      currentData.value.children[0].props['collapse-tags-tooltip'] = bool
    }
    return
  }

  if (key === 'border' && useFormCurrentData.value.componentName !== 'ElTable') {
    if (bool) {
      currentData.value.children[0].children.forEach((item) => {
        item.props['border'] = true
      })
    } else {
      currentData.value.children[0].children.forEach((item) => {
        delete item.props['border']
      })
    }
  }
}

function removeOptions(i) {
  if (isTable.value || isTabs) {
    currentData.value.children.splice(i, 1)
  } else {
    currentData.value.children[0].children.splice(i, 1)
  }
  options.value.splice(i, 1)
  inputs.value.splice(i, 1)
  showToolbar(getSelectDOM());
}

function moveElement(value, index, moveIndex) {
  const temp = value[index];
  value.splice(index, 1, value[moveIndex]);
  value.splice(moveIndex, 1, temp);
}

function moveUp(index,) {
  moveElement(options.value, index, index - 1)
  moveElement(inputs.value, index, index - 1)
  moveElement(isTabs || isTable.value ? currentData.value.children : currentData.value.children[0].children, index, index - 1)
  showToolbar(getSelectDOM());
  updateTableData()
}

function moveDown(index) {
  moveElement(options.value, index, index + 1)
  moveElement(inputs.value, index, index + 1)
  moveElement(isTabs || isTable.value ? currentData.value.children : currentData.value.children[0].children, index, index + 1)
  showToolbar(getSelectDOM());
  updateTableData()
}

function textChange(val, i) {
  options.value[i].label = val
  showToolbar(getSelectDOM());
}

function nameChange(val, i) {
  options.value[i].name = val
}

/**
 * 添加新选项到组件中
 */
function add() {
  if (!currentData.value?.children?.length) {
    console.error('当前组件 length 为 0')
    return
  }

  const targetChildren = isTabs || isTable.value
      ? currentData.value.children
      : currentData.value.children[0]?.children

  if (!targetChildren) {
    console.error('目标children不存在')
    return
  }

  const timestamp = new Date().getTime()
  const newOption = {
    label: 'New Option',
    ...(isTabs ? {name: timestamp} : {[isTable.value ? 'prop' : 'value']: timestamp.toString()})
  }

  if (currentData.value.children[0]?.props?.border) {
    newOption.border = true
  }

  const componentType = isTabs || isTable.value
      ? currentData.value.children[0].componentName
      : currentData.value.children[0]?.children[0]?.componentName

  if (!componentType) {
    console.error('无法确定组件类型')
    return
  }

  const newItem = {
    componentName: componentType,
    id: generateRandomId(),
    parentId: currentData.value.componentName === 'ElFormItem' ? currentData.value.children[0].id : currentData.value.id,
    props: newOption,
    ...(isTabs ? {children: []} : {})
  }

  targetChildren.push(reactive({...newItem}))

  if (options.value) {
    inputs.value[inputs.value.length] = newOption.label
    options.value.push(newOption)
  }

  if (isTabs) {
    nextTick(() => {
      props.initSortable?.({id: newItem.id, componentJSON: newItem})
    })
  }

  showToolbar(getSelectDOM());
}
</script>
<style scoped lang="scss">
.options {
  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
    border-bottom: 1px dotted #ebeef5;
    margin-bottom: 10px;
    padding: 10px 10px 10px 0;
    position: relative;
    border-radius: 5px;

    &:hover {
      background-color: #ebeef5;

      .toolbar {
        display: block;
      }
    }
  }

  .toolbar {
    display: none;
    position: absolute;
    bottom: 0;
    right: 10px;

    .delete {
      color: red;
    }

    .el-icon:not(.delete) {
      color: #3b82f6;
    }

    .el-icon {
      cursor: pointer;
      margin: 0 5px;
    }
  }
}
</style>