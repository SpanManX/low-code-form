<template>
  <div class="header">
    <el-button link type="primary" @click="handleDragOrDrop">{{ dragOrDrop ? '开启' : '关闭' }}拖放</el-button>
    <el-button link type="primary" @click="clearAll">清空画布</el-button>
    <el-button link type="primary" @click="exportJSON">导出JSON</el-button>
    <el-button link type="primary" @click="openPreview">预览</el-button>
  </div>
  <preview-dialog ref="previewDialogRef"/>
</template>
<script setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";
import componentDataStore from "../store/componentData";
import previewDialog from "../components/previewDialog.vue";
import formStore from "@/store/form.js";

const props = defineProps({
  json: [Object, Array],
  inline: Boolean
})
const emits = defineEmits(["onDragDrop", 'clearAll']);

const dragOrDrop = ref(false)
const previewDialogRef = ref(null)

function handleDragOrDrop() {
  dragOrDrop.value = !dragOrDrop.value
  emits("onDragDrop", dragOrDrop.value)
}

/**
 * 导出JSON数据
 */
async function exportJSON() {
  console.log(formStore.formOptions)

  const {labelPosition, labelWidth, inline} = formStore.formOptions

  const obj = {}
  if (labelPosition !== 'right' && labelPosition !== '') {
    obj.labelPosition = labelPosition
  }

  if (labelWidth !== '' && labelWidth !== 'auto') {
    obj.labelWidth = labelWidth
  }

  if (inline) {
    obj.inline = inline
  }

  console.log(JSON.stringify({formOptions: obj, forms: props.json}, null, 2));

  // let jsonStr = JSON.stringify(props.json, null, 2) // 格式化 JSON 数据
  // let blob = new Blob([jsonStr], {type: "application/json"});
  // let a = document.createElement("a");
  //
  // a.href = URL.createObjectURL(blob);
  // a.download = 'formData';
  // a.click();
  //
  // URL.revokeObjectURL(a.href);
  // nextTick(() => {
  //   a.remove()
  // })
}

function openPreview() {
  previewDialogRef.value.open(props.inline, props.json)
}

function clearAll() {
  ElMessageBox.confirm('这将清空画布，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    componentDataStore.CLEAR_COMPONENT_DATA_MAP()
    emits("clearAll")
  }).catch(() => {
  })
}
</script>
<style lang="scss" scoped>
.header {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
}

.el-dropdown {
  margin-left: 12px;
}
</style>
