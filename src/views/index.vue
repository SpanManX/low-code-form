<template>
  <div class="draggable-box">
    <lowCode></lowCode>
  </div>
</template>
<script setup>
import lowCode from "./lowCode-sortablejs.vue";
</script>
<style>
#app, .el-container {
  height: 100%;
  margin: 0;
}

.draggable-box {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #f0f2f5;
}
</style>
