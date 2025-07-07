<template>
  <div class="draggable-box">
    <lowCode></lowCode>
  </div>
</template>
<script setup>
import lowCode from "./views/lowCode-sortablejs.vue";
</script>
<style>
html, body, #app, .el-container {
  height: 100%;
  margin: 0;
}

.draggable-box {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f0f2f5;
}

.el-dialog {
  padding: 0 !important;
}

.el-dialog__footer {
  padding: 15px;
  border-top: 1px solid #e5e7eb;
}

.el-dialog__header {
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.el-dialog__body{
  padding: 15px
}
</style>
