<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { formatDate } from '@/helpers/utils'

// Реактивная переменная для отображения состояния выпадающего списка
const isDropdownShown = ref(false)

// Реактивная переменная для хранения выбранной даты
const selectedDate = ref('')

// Функция для обработки события открытия/закрытия выпадающего списка
const dropdownHandler = () => {
  isDropdownShown.value = !isDropdownShown.value
}

const emits = defineEmits(['selected'])

// Обработчик клика по элементу выпадающего списка
const handleItemClick = (item) => {
  selectedDate.value = item
  isDropdownShown.value = false
  emits('selected', item)
}

// Реактивная ссылка на элемент выпадающего списка
const refDropdown = ref(null)

// Обработчик клика вне элемента выпадающего списка для его закрытия
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

// Получение текущей даты
const currentDate = new Date()

// Создание массива с датами на ближайшие 14 дней
const datesArray = []
for (let i = 0; i < 14; i++) {
  const date = new Date(currentDate)
  date.setDate(currentDate.getDate() + i)
  datesArray.push(formatDate(date))
}
</script>

<template>
  <div :class="{ select: true, 'dropdown-show': isDropdownShown }">
    <label class="select__label">
      <input
        @click.stop="dropdownHandler"
        autocomplete="off"
        class="select__input"
        readonly
        placeholder="Выберите дату"
        v-model="selectedDate"
      />
      <i class="arrow-icon">
        <IconArrow />
      </i>
    </label>
    <div class="select__dropdown dropdown">
      <div class="dropdown__inner">
        <ul class="dropdown__list">
          <li v-for="item in datesArray" @click="handleItemClick(item)" class="dropdown__item">
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
    border-radius: 8px;
    cursor: pointer;

    @include media-medium {
      height: 48px;
      @include Ms-r18;
    }

    @include media-small {
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

    span {
      @include Ms-r20;
      color: $main;

      @include media-medium {
        @include Ms-r18;
      }
      @include media-small {
        padding: 11px 12px;
        @include Ms-r14;
      }
    }
  }
}
</style>
