<template>
  <div class="low-code-form">
    <edit-panel v-if="!isPreview"/>
    <preview-panel ref="previewRef" :data="data" :variables="variables" :callback="callback" v-else/>
  </div>
</template>
<script setup>
import editPanel from "./editPanel.vue";
import previewPanel from "./previewPanel.vue";
import formStore from "@/store/form.js";
import {ref} from "vue";
import {schema} from "@/utils/sortableManager.js";

defineExpose({
  getFormVariable,
  getForm,
  formRef
})

const props = defineProps({
  isPreview: Boolean,
  data: {
    type: Object,
    default: () => ({}),
  },
  variables: {
    type: Object,
    default: () => ({})
  },
  callback: {type: Function},
})

const previewRef = ref(null)

function formRef() {
  // console.log(previewRef.value)
  return previewRef.value.formRef
}

function getFormVariable() {
  return formStore.formData.value
}

function getForm() {
  const {labelPosition, labelWidth, inline} = formStore.formOptions

  const obj = {}
  if (labelPosition !== 'right' && labelPosition !== '') {
    obj.labelPosition = labelPosition
  }

  if (labelWidth !== '' && labelWidth !== 'auto') {
    obj.labelWidth = labelWidth
  }

  if (inline) {
    obj.inline = inline
  }

  return JSON.stringify({formOptions: obj, forms: schema.value.components}, null, 2)
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  margin: 0;
}

.low-code-form {
  background-color: #f0f2f5;
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
