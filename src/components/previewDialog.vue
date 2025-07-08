<template>
  <el-dialog v-model="previewVisible" title="预览" @close="close">
    <div id="preview-box"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit">触发校验</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {createApp, h, nextTick, ref} from "vue";
import * as ElementPlus from "element-plus";
import {ElMessage} from "element-plus";
import {schema} from "@/utils/sortableManager.js";
import formStore from "@/store/form.js";
import {createRenderer} from "@/utils/renderComponent.js";
import {zhCn} from "element-plus/es/locale/index";

defineExpose({
  open
})

const previewVisible = ref(false)
const formRef = ref(null)

const formData = formStore.previewFormData;
const rules = formStore.rules;

let app = null

function open() {
  previewVisible.value = true

  nextTick(() => {
    const renderComponent = createRenderer(true)
    app = createApp({
      render() {
        const list = JSON.parse(JSON.stringify(schema.value.components)) // 响应式依赖，用于触发 updated 生命周期
        return h(
            ElementPlus['ElForm'],
            {
              key: 'preview',
              ref: formRef,
              model: formData,
              rules: rules,
              ...formStore.formOptions
            },
            {
              default: () => list.map(item => {
                return renderComponent(item)
              })
            }
        )
      }
    }).use(ElementPlus, {locale: zhCn});
    app.mount('#preview-box')
  })
}

function close() {
  previewVisible.value = false
  app.unmount()
  formStore.CLEAR_PREVIEW_FORM_DATA()
}

function submit() {
  formRef.value.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('校验成功')
    } else {
      ElMessage.error('校验失败')
    }
  })
}

function reset() {
  formRef.value.resetFields()
}
</script>
<style scoped lang="scss">
#preview-box {
  height: 600px;
  overflow: auto;
}
</style>
