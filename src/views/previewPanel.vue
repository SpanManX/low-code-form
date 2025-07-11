<template>
  <div id="preview-panel"></div>
</template>
<script setup>
import {createApp, h, onMounted, ref} from "vue";
import * as ElementPlus from "element-plus";
import {zhCn} from "element-plus/es/locale/index";
import {createRenderer} from "../utils/renderComponent.js";
import componentDataStore from "../store/componentData";
import formStore from "@/store/form.js";

const props = defineProps({
  data: {type: Object, required: true},
  variables: {type: Object, required: true},
  callback: {type: Function},
})

const formRef = ref(null);
const formData = formStore.previewFormData;
const rules = formStore.rules;

// 初始化 SortableJS
onMounted(() => {
  formData.value = props.variables
  const renderComponent = createRenderer({isPreview: true, callback: props.callback})
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

  app.mount('#preview-panel')
})
</script>
<style scoped lang="scss">
#preview-panel {
  height: 100%;
}
</style>
