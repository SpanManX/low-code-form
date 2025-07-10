<template>
  <el-icon :style="style">
    <component :is="ElIcons[props.icon]"/>
  </el-icon>
</template>
<script setup>
import * as ElIcons from "@element-plus/icons-vue";
import {computed} from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: [Number, String],
    default: 16,
  }
})

const style = computed(() => {
  return {
    color: props.color,
    fontSize: `${props.size || 16}px`,
  }
})

</script>
<style scoped lang="scss">

</style>
