<template>
  <div class="low-code-form">
    <edit-panel v-if="!isPreview" style="background-color: #f0f2f5"/>
    <preview-panel :data="data" :callback="callback" v-else/>
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
  callback: {type: Function},
})
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  margin: 0;
}

.low-code-form {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

:deep() {
  .el-form--inline .drop-item:not(.drop-item-card):not(.drop-item-el-tabs):not(.drop-item-el-button):not(.drop-item-el-divider):not(.drop-item-div-component) {
    display: inline-flex;
  }

  .drop-item-el-button {
    display: inline-block;
  }

  .drop-item-el-button + .drop-item-el-button {
    margin-left: 12px;
  }

  .drop-item {
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>
