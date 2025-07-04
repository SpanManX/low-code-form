<template>
  <div class="grid" :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {onUnmounted, reactive, watch} from "vue";

const props = defineProps({
  rows: {
    type: Number,
    default: 1,
  },
  columns: {
    type: Number,
    default: 1,
  },
  gap: {
    type: Number,
    default: 10,
  }
})

const style = reactive({})

let timer = null;

watch(() => props.columns, (val) => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(val)
    if (!val) val = 1
    style['grid-template-columns'] = `repeat(${val}, calc(100% / ${val}))`;
  }, 300)
})

onUnmounted(() => {
  timer && clearTimeout(timer);
})
</script>
<style scoped lang="scss">
.grid {
  display: grid;
  min-height: 50px;
  border: 1px dashed #409EFF;
  border-radius: 5px;
  padding: 10px;
}
</style>
