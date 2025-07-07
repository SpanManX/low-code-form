<template>
  <div class="element" :class="{[props.class]:props.class,['grid-border']:!isPreview}" :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {computed} from "vue";
import divStylesStore from '../../../store/divStyles.js'

const props = defineProps({
  class: {
    type: String,
    required: true,
  },
  columns: {
    type: Number,
    default: 1,
  },
  gap: {
    type: Number,
    default: 10,
  },
  isPreview: {
    type: Boolean,
  }
})

const style = computed(() => {
  const obj = {
    'grid-template-columns': `repeat(${props.columns || 1}, calc(100% / ${props.columns || 1} - ${(props.gap ? props.gap : 0) + 'px'}))`,
    'grid-gap': `${props.gap}px`
  }
  divStylesStore.SET_STYLES(props.class, {...obj, display: "grid"})
  return obj
})
</script>
<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
}

.grid-border {
  box-sizing: border-box;
  min-height: 50px;
  border: 1px dashed #409EFF;
  border-radius: 5px;
}
</style>
