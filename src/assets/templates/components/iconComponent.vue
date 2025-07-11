<template>
  <el-icon :style="style">
    <component :is="ElIcons[props.icon]"/>
  </el-icon>
</template>
<script setup>
import * as ElIcons from "@element-plus/icons-vue";
import {computed, onMounted, onUnmounted} from "vue";
import divStylesStore from "@/store/divStyles.js";
import iconStore from "@/store/icon.js";

const props = defineProps({
  class: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  fontSize: {
    type: [Number, String]
  }
})

const style = computed(() => {
  const obj = {}
  if (props.fontSize) {
    obj.fontSize = `${props.fontSize}px`
  }
  if (props.color) {
    obj.color = props.color
  }
  if (Object.keys(obj).length) {
    divStylesStore.SET_STYLES(`${props.class} ::v-deep(.el-icon)`, obj)
  } else {
    divStylesStore.DELETE_STYLES(`${props.class} ::v-deep(.el-icon)`)
  }
  return obj
})

onMounted(() => {
  iconStore.SET_ICONS(props.class, props.icon)
})

onUnmounted(() => {
  iconStore.DELETE_ICONS(props.class)
  divStylesStore.DELETE_STYLES(`${props.class} ::v-deep(.el-icon)`)
})
</script>
<style scoped lang="scss">

</style>
