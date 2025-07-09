<template>
  <div class="element" :class="{[props.class]:props.class,['div-border']:!isPreview}" :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {computed} from "vue";
import divStylesStore from "@/store/divStyles.js";

const props = defineProps({
  class: {
    type: String,
    required: true,
  },
  isPreview: {
    type: Boolean,
  },
  'text-align': {
    type: String,
  },
  padding: {
    type: String,
  }
})

const style = computed(() => {
  const obj = {
    ...props
  }
  const className = obj.class
  delete obj.class
  delete obj.isPreview
  divStylesStore.SET_STYLES(className, obj)
  return obj
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
