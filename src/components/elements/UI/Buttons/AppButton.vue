<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  settings: Object
})

const emits = defineEmits(['click'])

// Обработчик клика по кнопке
const handleClick = () => {
  emits('click')
}
</script>

<template>
  <button :type="settings.type" @click="handleClick" class="main-btn">
    <span>{{ settings.text }}</span>
  </button>
</template>

<style scoped lang="scss">
.main-btn {
  padding: 15px 24px;
  min-height: 56px;
  background-color: $primary-100;
  border-radius: 8px;
  @include defaultTransition;

  @include hover {
    background-color: $primary-200;
  }

  @include media-medium {
    min-height: 48px;
  }

  span {
    @include Ms-r20;
    color: $white;

    @include media-medium {
      @include Ms-r18;
    }
  }
}
</style>
