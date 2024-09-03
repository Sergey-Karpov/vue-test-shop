<script setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['input'])

const props = defineProps({
  settings: Object
})

// Обработчик ввода значения в поле ввода
function handleInput(event) {
  // Проверка, есть ли установленная маска для ввода
  if (props.settings.mask) {
    props.settings.mask.handler(event)
  }
  emits('input', event.target.value)
}

// Обработчик фокуса на поле ввода
function handleFocus(event) {
  // Проверка, есть ли установленная маска для ввода
  if (props.settings.mask) {
    props.settings.mask.handler(event)
  }
}
</script>

<template>
  <input
    autocomplete="off"
    class="input"
    :placeholder="settings.placeholder"
    @input="handleInput"
    @focus="handleFocus"
    :type="settings.type"
  />
</template>

<style scoped lang="scss">
.input {
  padding: 15px 16px;
  max-width: 100%;
  height: 56px;
  @include Ms-r20;
  color: $main;
  outline: none;
  border: none;
  background-color: $white;
  border: 1px solid transparent;
  border-radius: 8px;
  @include defaultTransition;

  @include hover {
    border-color: $primary-100;
  }

  &:focus {
    border-color: $base-100;
  }

  @include media-medium {
    height: 48px;
    @include Ms-r18;
  }

  @include media-small {
    padding: 11px 16px;
    height: 40px;
    @include Ms-r14;
  }

  &::placeholder {
    @include Ms-r20;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }
}
</style>
