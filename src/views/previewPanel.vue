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
      return h(
          ElementPlus['ElForm'],
          {
            ref: formRef,
            model: formData,
            rules: rules,
            ...formStore.formOptions
          },
          {
            default: () => props.data.forms.map(item => {
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
