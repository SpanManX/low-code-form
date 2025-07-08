<template>
  <el-form label-width="100px">
    <el-form-item>
      <template #label>
        标签宽度
        <el-icon class="form-item-tip" title="0 或空为 auto">
          <WarningFilled/>
        </el-icon>
      </template>
      <el-input-number v-model="labelWidth" :min="0" step-strictly :step="1" :controls="false"
                       @change="changeLabelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="标签文本对齐">
      <el-radio-group v-model="radio" @change="changAlignLabel">
        <el-radio value="left">左对齐</el-radio>
        <el-radio value="right">右对齐</el-radio>
        <el-radio value="top">上对齐</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="表单内联">
      <el-switch v-model="inline" @change="inlineChange"></el-switch>
    </el-form-item>
  </el-form>
</template>
<script setup>
import {ref} from "vue";
import {WarningFilled} from "@element-plus/icons-vue";
import formStore from "../store/form.js";

defineExpose({
  init
})

const emits = defineEmits(['inlineChange'])

const radio = ref('right')
const labelWidth = ref(null)
const inline = ref(false)

function init(options) {
  labelWidth.value = options.labelWidth
  radio.value = options.labelPosition
  inline.value = options.inline
}

function changAlignLabel() {
  formStore.SET_FORM_OPTIONS({labelPosition: radio.value, labelWidth: labelWidth.value})
}

function changeLabelWidth() {
  formStore.SET_FORM_OPTIONS({labelPosition: radio.value, labelWidth: labelWidth.value})
}

function inlineChange(val) {
  emits('inlineChange', val)
}
</script>
<style scoped lang="scss">
.tip {
  color: coral;
  cursor: pointer;
  align-self: center;
  margin-left: 5px;
}
</style>
