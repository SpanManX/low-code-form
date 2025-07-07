<template>
  <div class="element" :class="props.class" :style="style">
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
  'text-align': {
    type: String,
  }
})

const style = computed(() => {
  if(props['text-align']) {
    const obj = {
      ...props
    }
    const className = obj.class
    delete obj.class
    divStylesStore.SET_STYLES(className, obj)
  }
  return props
})

</script>
<style scoped lang="scss">
.block-element {
  min-height: 50px;
  border: 1px dashed #ecd55e;
  border-radius: 5px;
  //padding: 10px;
  box-sizing: border-box;

  //width: calc(100% + 20px);
  //padding: 10px 0;
  //position: relative;
  //left: -10px;
}
</style>
