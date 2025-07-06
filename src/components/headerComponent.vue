<template>
  <div class="header">
    <el-button link type="primary" @click="handleDragOrDrop">{{ dragOrDrop ? '开启' : '关闭' }}拖放</el-button>
    <el-button link type="primary" @click="clearAll">清空画布</el-button>
    <el-button link type="primary" @click="exportJSON">导出JSON</el-button>
  </div>
</template>
<script setup>
import {ref} from "vue";
import componentDataStore from "../store/componentData";
import {ElMessageBox} from "element-plus";

const props = defineProps({
  json: [Object, Array]
})
const emits = defineEmits(["onDragDrop", 'clearAll']);

const dragOrDrop = ref(false)

function handleDragOrDrop() {
  dragOrDrop.value = !dragOrDrop.value
  emits("onDragDrop", dragOrDrop.value)
}

/**
 * 异步导出JSON数据
 *
 * 这个函数用于异步导出JSON数据。首先，它会获取组件数据映射和传入的JSON数据，然后将这些数据合并到一个树状结构中。
 */
async function exportJSON() {
  console.log(JSON.stringify(props.json, null, 2));
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
