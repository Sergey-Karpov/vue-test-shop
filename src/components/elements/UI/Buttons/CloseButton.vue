<script setup>
import { defineEmits } from 'vue'

const emits = defineEmits(['click'])

// Обработчик клика по кнопке
const handleClick = () => {
  emits('click')
}
</script>

<template>
  <button type="button" @click="handleClick" class="close-btn">
    <i class="material-icons">close</i>
  </button>
</template>

<style scoped lang="scss">
.close-btn {
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
