<template>
  <div class="draggable-box">
    <lowCode></lowCode>
  </div>
</template>
<script setup>
// import lowCode from "./views/lowCode.vue";
// import lowCode from "./views/lowCode-sortablejs_backup.vue";
import lowCode from "./views/lowCode-sortablejs.vue";
// import lowCode from "./views/test.vue";
// import lowCode from "./views/custom.vue";
// import lowCode from "./views/divComponent.vue";
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
</style>
