<template>
  <index ref="indexRef" :data="demo6" :variables="testData" :callback="handleCallback" :isPreview="false"></index>
  <el-image-viewer
      v-if="showPreview !== ''"
      :url-list="[showPreview]"
      show-progress
      @close="showPreview = ''"
  />
</template>
<script setup>
import index from "./views";
import demo6 from './demo/demo7.js'
import {ref} from "vue";

const showPreview = ref('');
const indexRef = ref(null);

const testData = {
  "field1752214307646320": "val1",
  "field1752214306566359": 2,
  "field1752214311914827": ["ValueB"],
  "field1752214310595119": "2025-07-15T16:00:00.000Z",
  "field1752214308776432": "11111111111"
}

function handleCallback(name, event) {
  if (name === 'ElUpload') {
    console.log(name, event);
    event.props.httpRequest = (e) => {
      console.log(e.file, '自定义上传行为');
    }
    event.props.onPreview = (e) => {
      showPreview.value = e.url
      console.log(e);
    }
  }
}
</script>
<style>
#app, html, body {
  height: 100%;
  margin: 0;
}
</style>
