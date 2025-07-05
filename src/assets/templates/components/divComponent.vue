<template>
  <div :style="style">
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

</style>