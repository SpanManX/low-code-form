<template>
  <div class="grid element" :style="style">
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
let timer1 = null;

watch(() => props.columns, (val) => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    if (!val) val = 1
    style['grid-template-columns'] = `repeat(${val}, calc(100% / ${val} - ${(props.gap ? props.gap : 0) + 'px'}))`;
  }, 300)
})

watch(() => props.gap, (val) => {
  timer1 && clearTimeout(timer);
  timer1 = setTimeout(() => {
    if (!val) val = 1
    style['grid-gap'] = `${val}px`;
  }, 300)
})

onUnmounted(() => {
  timer && clearTimeout(timer);
})
</script>
<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
  min-height: 50px;
  border: 1px dashed #409EFF;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
