<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  name: String
})

const emits = defineEmits(['change'])

const isChecked = ref(false)

const handleChangeToggle = () => {
  isChecked.value = !isChecked.value
  emits('change', isChecked.value)
}
</script>

<template>
  <label class="toggle">
    <div class="toggle__name">
      <span>{{ name }}</span>
    </div>
    <input
      @change="handleChangeToggle"
      type="checkbox"
      class="checkbox--hidden"
      :checked="isChecked"
    />
    <div class="toggle__check">
      <span class="toggle__display"></span>
    </div>
  </label>
</template>

<style scoped lang="scss">
.toggle {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  @include media-small {
    gap: 8px;
  }

  @include hover {
    .toggle__check {
      background-color: $primary-300;
    }
  }

  // .toggle__name
  &__name {
    @include Ms-r20;
    color: $main;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }

  // .toggle__check
  &__check {
    position: relative;
    width: 52px;
    height: 28px;
    border-radius: 24px;
    background-color: $base-500;
    @include defaultTransition;
  }

  // .toggle__display
  &__display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-24px, -50%);
    width: 24px;
    height: 24px;
    border-radius: 24px;
    background-color: $white;
    @include defaultTransition;
  }
}
.checkbox--hidden {
  position: absolute;
  appearance: none;

  &:checked {
    & + .toggle__check {
      background-color: $primary-100;
      .toggle__display {
        transform: translate(0, -50%);
      }
    }
  }
}
</style>
