<template>
  <div class="block-element element" :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
  'text-align': {
    type: String,
  }
})

const style = computed(() => {
  console.log(props)
  return props
})
</script>
<style scoped lang="scss">
.block-element {
  min-height: 50px;
  border: 1px dashed #ecd55e;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
</style>