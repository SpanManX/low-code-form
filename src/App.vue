<template>
  <index :data="demo6" :callback="handleCallback" :isPreview="false"></index>
  <el-image-viewer
      v-if="showPreview !== ''"
      :url-list="[showPreview]"
      show-progress
      @close="showPreview = ''"
  />
</template>
<script setup>
import index from "./views";
import demo6 from './demo/demo6.js'
import {ref} from "vue";

let showPreview = ref('');

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
