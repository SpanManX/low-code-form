<template>
  <div :class="`drop-item drop-item-${toKebabCase(componentData.componentName)}`"
       :data-component="componentData.componentName"
       :data-id="componentData.id || componentData.children?.[0]?.id">
    <slot></slot>
  </div>
</template>
<script setup>
import {toKebabCase} from "@/utils/jsonToElementPlusTags.js";

const props = defineProps({
  componentData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>
<style scoped lang="scss">

</style>
