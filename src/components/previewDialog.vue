<template>
  <el-dialog v-model="previewVisible" title="预览" @close="close">
    <div id="preview-box"></div>
  </el-dialog>
</template>
<script setup>
import {createApp, h, nextTick, ref} from "vue";
import * as ElementPlus from "element-plus";
import {schema} from "@/utils/sortableManager.js";
import formStore from "@/store/form.js";
import {createRenderer} from "@/utils/renderComponent.js";
import {zhCn} from "element-plus/es/locale/index";

defineExpose({
  open
})

const previewVisible = ref(false)
const formRef = ref(null)

const formData = formStore.formData;
const rules = formStore.rules;

let app = null

function open({inline = false}) {
  previewVisible.value = true
  const {labelPosition, labelWidth} = formStore.formOptions

  nextTick(() => {
    const renderComponent = createRenderer()
    app = createApp({
      render() {
        const list = JSON.parse(JSON.stringify(schema.value.components)) // 响应式依赖，用于触发 updated 生命周期
        return h(
            ElementPlus['ElForm'],
            {
              ref: formRef,
              inline: inline,
              model: formData,
              rules: rules,
              labelWidth: labelWidth,
              labelPosition: labelPosition
            },
            {
              default: () => list.map(item => {
                return renderComponent(item, true)
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
}
</script>
<style scoped lang="scss">
#preview-box {
  height: 500px;
}
</style>
