<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  data: Object
})

const emits = defineEmits(['change'])

// Обработчик клика по радио кнопке
const handleClick = () => {
  emits('change')
}

// Реактивная переменная для хранения данных радио кнопки
const radioData = ref({
  name: props.data.name, // Имя радио кнопки
  value: props.data.value, // Значение радио кнопки
  label: props.data.label // Текстовая метка радио кнопки
})
</script>

<template>
  <label class="radio">
    <input
      type="radio"
      :name="radioData.name"
      class="radio--hidden"
      :value="radioData.value"
      @click="handleClick()"
    />
    <span class="radio__box"></span>
    <span class="radio__name">{{ radioData.label }}</span>
  </label>
</template>

<style scoped lang="scss">
.radio {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  cursor: pointer;
  @include defaultTransition;

  @include hover {
    .radio__box {
      border-color: $primary-100;
    }
  }

  @include media-medium {
    gap: 8px;
  }

  // .radio--hidden
  &--hidden {
    position: absolute;
    appearance: none;

    &:checked {
      & + .radio__box {
        border-width: 9px;
        border-color: $primary-100;
      }
    }
  }

  // .radio__box
  &__box {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid $base-400;
    background-color: $white;
    @include defaultTransition;
  }

  // .radio__name
  &__name {
    @include Ms-r20;
    color: $main;
    @include defaultTransition;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }
}
</style>
