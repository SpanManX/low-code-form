<template>
  <index ref="indexRef" :data="demo6" :variables="testData" :callback="handleCallback" :isPreview="isPreview"></index>
  <el-image-viewer
      v-if="showPreview !== ''"
      :url-list="[showPreview]"
      show-progress
      @close="showPreview = ''"
  />
  <el-button @click="handleTest" v-if="isPreview">校验</el-button>
</template>
<script setup>
import index from "./views";
import demo6 from './demo/demo7.js'
import {reactive, ref} from "vue";

const isPreview = false;

const showPreview = ref('');
const indexRef = ref(null);

const testData = reactive({
  "field1752214307646320": 1752244342177,
  "field1752214306566359": 2,
  "field1752214311914827": ["ValueB"],
  "field1752214310595119": "2025-07-30T16:00:00.000Z",
  "field1752214308776432": "123",
  "field1752214314625551": [],
  "field1752214316464511": []
})

function handleCallback(name, fieldName, vm) {
  if (name === 'ElButton' && (fieldName === 'field1752214304261429' || fieldName === 'field1752214305457614')) {
    vm.props.onClick = () => {
      console.log(fieldName);
    }
  }
  if (name === 'ElUpload') {
    vm.props.httpRequest = (e) => {
      console.log(e.file, '自定义上传行为');
    }
    vm.props.onPreview = (e) => {
      showPreview.value = e.url
      console.log(e);
    }
  }
}

function handleTest() {
  if (isPreview) { // 预览
    indexRef.value.formRef().validate((valid) => {

    });
  } else { // 用于编辑模式时用于获取数据
    console.log(indexRef.value.getFormData());  // 获取表单变量
    console.log(indexRef.value.getJson());      // 获取表单json数据
  }
}
</script>
<style>
#app, html, body {
  height: 100%;
  margin: 0;
}
</style>
