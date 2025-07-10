<template>
  <div class="element" :class="{[props.class]:props.class,['div-border']:!isPreview}"
       :style="style">
    <slot></slot>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import divStylesStore from "@/store/divStyles.js";

const props = defineProps({
  id: String,
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

const newClass = ref('')

const style = computed(() => {
  const obj = {
    textAlign: props.textAlign,
    padding: props.padding,
  }
  // const className = obj.class
  // delete obj.class
  // delete obj.isPreview
  // delete obj.id
  // newClass.value = divStylesStore.GET_STYLE_NEW_KEY(props.class)
  // console.log(newClass.value)
  divStylesStore.SET_STYLES(props.class.split(' ')[1], obj)
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
