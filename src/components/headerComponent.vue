<template>
  <div class="header">
    <el-button link type="primary" @click="handleDragOrDrop">{{ dragOrDrop ? '开启' : '关闭' }}拖放</el-button>
    <el-button link type="primary" @click="clearAll">清空画布</el-button>
    <el-button link type="primary" @click="exportJSON">导出JSON</el-button>
  </div>
</template>
<script setup>
import { ref} from "vue";
import {mergeJSON} from "@/utils/mergeJSON.js";
import componentDataStore from "../store/componentData";

const props = defineProps({
  json: [Object, Array]
})
const emits = defineEmits(["onDragDrop"]);

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
  // 获取组件数据映射的深拷贝
  const dataMap = JSON.parse(JSON.stringify(componentDataStore.componentDataMap))
  // 获取传入的JSON数据的深拷贝
  let treeData = JSON.parse(JSON.stringify(props.json))
  // 异步合并数据映射和传入的JSON数据到树状结构中
  await mergeJSON(dataMap, props.json, treeData)

  console.log(JSON.stringify(treeData, null, 2));
}

function clearAll(){
  componentDataStore.clearAll()
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
