<template>
  <div class="element block-element" :class="{['div-border']:!isPreview}"
       :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {computed, onUnmounted} from "vue";
import divStylesStore from "@/store/divStyles.js";

const props = defineProps({
  class: {
    type: String,
    required: true,
  },
  isPreview: {
    type: Boolean,
  },
  textAlign: {
    type: String,
  },
  padding: {
    type: String,
  }
})

const style = computed(() => {
  const obj = {
    textAlign: props.textAlign,
    padding: props.padding,
  }
  divStylesStore.SET_STYLES(props.class.split(' ')[1], obj)
  return obj
})

onUnmounted(() => {
  divStylesStore.DELETE_STYLES(props.class.split(' ')[1])
})
</script>
<style scoped lang="scss">
.div-border {
  min-height: 50px;
  border: 1px dashed #ecd55e;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
