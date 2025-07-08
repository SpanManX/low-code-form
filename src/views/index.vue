<template>
  <div class="draggable-box">
    <edit-panel v-if="!isPreview"/>
    <preview-panel :data="data" v-else/>
  </div>
</template>
<script setup>
import editPanel from "./editPanel.vue";
import previewPanel from "./previewPanel.vue";

const props = defineProps({
  isPreview: Boolean,
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>
<style>
#app, .el-container {
  height: 100%;
  margin: 0;
}

.draggable-box {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  background-color: #f0f2f5;
}
</style>
