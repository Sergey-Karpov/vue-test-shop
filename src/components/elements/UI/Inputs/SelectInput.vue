<script setup>
import { defineProps, ref, onMounted, onUnmounted, defineEmits } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'

const props = defineProps({
  select: Object
})

// Реактивная переменная для хранения значения ввода
const inputValue = ref('')

// Реактивная переменная для отображения/скрытия выпадающего списка
const isDropdownShown = ref(false)

// Эмиттер события для оповещения родительского компонента об изменении значения ввода
const emits = defineEmits(['input'])

// Функция для обработки клика по полю ввода и открытия/закрытия выпадающего списка
const dropdownHandler = () => {
  isDropdownShown.value = !isDropdownShown.value
}

// Функция для обработки выбора элемента из выпадающего списка
const handleItemClick = (item) => {
  inputValue.value = item
  isDropdownShown.value = false
  emits('input', item)
}

// Реактивная ссылка на элемент выпадающего списка
const refDropdown = ref(null)

// Функция для обработки клика вне выпадающего списка для его закрытия
const handleClickOutside = (event) => {
  if (refDropdown.value && !refDropdown.value.contains(event.target)) {
    isDropdownShown.value = false
  }
}

// Хук, вызываемый после монтирования компонента
onMounted(() => {
  refDropdown.value = document.querySelector('.select__dropdown.dropdown')
  document.addEventListener('click', handleClickOutside)
})

// Хук, вызываемый перед удалением компонента из DOM
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div :class="{ select: true, 'dropdown-show': isDropdownShown }">
    <label class="select__label">
      <input
        @click.stop="dropdownHandler"
        autocomplete="off"
        class="select__input"
        readonly
        :value="inputValue"
        :placeholder="select.placeholder"
      />
      <i class="arrow-icon">
        <IconArrow />
      </i>
    </label>
    <div class="select__dropdown dropdown">
      <div class="dropdown__inner">
        <ul class="dropdown__list">
          <li v-for="item in select.items" @click="handleItemClick(item)" class="dropdown__item">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
  min-width: fit-content;

  &.dropdown-show {
    .dropdown {
      opacity: 1;
      pointer-events: fill;
      visibility: visible;
    }

    .select__input {
      border-color: $base-100;
    }

    .arrow-icon {
      transform: rotate(180deg);
    }
  }

  // .select__input
  &__input {
    padding: 15px 16px;
    max-width: 100%;
    width: 100%;
    height: 56px;
    @include Ms-r20;
    color: $main;
    outline: none;
    border: none;
    background-color: $white;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    @include defaultTransition;

    @include hover {
      border-color: $primary-100;
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

  // .select__dropdown
  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    width: 100%;
    z-index: 2;
  }

  .arrow-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    pointer-events: none;
    @include defaultTransition;

    @include media-medium {
      top: 12px;
    }

    @include media-small {
      top: 8px;
      right: 12px;
    }
  }
}
.dropdown {
  background-color: $white;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  @include defaultTransition;
  box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1);
  border-radius: 8px;

  // .dropdown__inner
  &__inner {
    max-height: 280px;
    overflow-y: auto;

    @include media-small {
      max-height: 180px;
    }
  }

  // .dropdown__list
  &__list {
  }

  // .dropdown__item
  &__item {
    padding: 15px 16px;
    width: 100%;
    cursor: pointer;
    @include defaultTransition;

    @include hover {
      background-color: #f8f8fa;
    }

    @include media-small {
      padding: 11px 12px;
    }

    span {
      @include Ms-r20;
      color: $main;

      @include media-medium {
        @include Ms-r18;
      }
      @include media-small {
        @include Ms-r14;
      }
    }
  }
}
</style>
