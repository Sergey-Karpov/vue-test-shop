<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const props = defineProps({
  select: Object
})

const emits = defineEmits(['change'])

// Реактивная переменная для отображения состояния выпадающего списка
const isDropdownShown = ref(false)

// Функция для обработки события открытия/закрытия выпадающего списка
const dropdownHandler = () => {
  isDropdownShown.value = !isDropdownShown.value
}

// Реактивная ссылка на элемент выпадающего списка
const refDropdown = ref(null)

// Обработчик клика вне элемента выпадающего списка для его закрытия
const handleClickOutside = (event) => {
  if (refDropdown.value && !refDropdown.value.contains(event.target)) {
    isDropdownShown.value = false
  }
}

// Реактивная переменная для хранения выбранных значений чекбоксов
const checkedValue = ref([])

// Функция для обработки изменения состояния чекбокса
const handleCheckboxChange = (id) => {
  const index = checkedValue.value.indexOf(id)

  if (index !== -1) {
    checkedValue.value.splice(index, 1)
  } else {
    checkedValue.value.push(id)
  }

  emits('change', checkedValue.value)
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
        :placeholder="select.placeholder"
      />
      <i class="arrow-icon">
        <IconArrow />
      </i>
    </label>
    <div class="select__dropdown dropdown">
      <div class="dropdown__inner">
        <ul class="dropdown__list">
          <li v-for="item in select.items" class="dropdown__item">
            <label class="checkbox">
              <input
                @change="handleCheckboxChange(item.id)"
                :value="item.id"
                type="checkbox"
                class="checkbox--hidden"
              />
              <span class="checkbox__check">
                <i>
                  <IconCheck />
                </i>
              </span>
              <span class="checkbox__text">{{ item.title }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  height: fit-content;
  position: relative;
  width: fit-content;

  @include media-small {
    max-width: 219px;
  }

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

  // .select__label
  &__label {
    display: block;
  }

  // .select__input
  &__input {
    padding: 15px 16px;
    max-width: 100%;
    height: 56px;
    @include Ms-r20;
    color: $main;
    outline: none;
    border: none;
    background-color: $base-500;
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
      right: 16px;
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
  overflow: hidden;

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
    @include defaultTransition;

    @include hover {
      background-color: #f8f8fa;
    }
  }
}

.checkbox {
  padding: 15px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  @include defaultTransition;

  @include media-medium {
    padding: 10px 12px;
    gap: 8px;
  }

  @include hover {
    background-color: #f8f8fa;
    .checkbox__check {
      border-color: $primary-100;
    }
  }

  // .checkbox--hidden
  &--hidden {
    position: absolute;
    appearance: none;

    &:checked {
      & + .checkbox__check {
        background-color: $primary-100;
        border-color: $primary-100;

        i {
          opacity: 1;
        }
      }
    }
  }

  // .checkbox__check
  &__check {
    position: relative;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border: 1px solid $base-400;
    border-radius: 4px;
    @include defaultTransition;

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      @include defaultTransition;
    }
  }

  // .checkbox__text
  &__text {
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
