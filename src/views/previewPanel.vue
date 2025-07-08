<template>
  <div class="preview-panel">

  </div>
</template>
<script setup>
import {createApp, createRenderer, h, onMounted, ref} from "vue";
import * as ElementPlus from "element-plus";
import {zhCn} from "element-plus/es/locale/index";
import componentDataStore from "../store/componentData";
import {createSortableManager} from "@/utils/sortableManager.js";
import formStore from "@/store/form.js";

const props = defineProps({
  data: {type: Object},
})

const formRef = ref(null);
const formData = formStore.formData;
const rules = formStore.rules;

// 构建 sortable 管理器
const {
  schema,
} = createSortableManager()

// 初始化 SortableJS
onMounted(() => {
  const renderComponent = createRenderer()
  const app = createApp({
    render() {
      const list = schema.value.components // 响应式依赖，用于触发 updated 生命周期
      return h(
          ElementPlus['ElForm'],
          {
            ref: formRef,
            inline: formStore.formOptions.inline,
            model: formData,
            rules: rules,
            labelWidth: formStore.formOptions.labelWidth,
            labelPosition: formStore.formOptions.labelPosition
          },
          {
            default: () => list.map(item => {
              componentDataStore.SET_COMPONENT_DATA_MAP(item.id, item)
              return renderComponent(item)
            })
          }
      )
    }
  }).use(ElementPlus, {locale: zhCn});

  app.mount('#canvas-drop')
})
</script>
<style scoped lang="scss">
.preview-panel {
  height: 100%;
}
</style>
