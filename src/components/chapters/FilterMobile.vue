<script setup>
// Импорт необходимых компонентов и функций из Vue и хранилища продуктов
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue'
import { useProductsStore } from '@/stores/products'
import AppToggle from '@/components/elements/UI/Inputs/AppToggle.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import CloseButton from '@/components/elements/UI/Buttons/CloseButton.vue'
import AppButton from '../elements/UI/Buttons/AppButton.vue'

// Определение пропсов компонента
const props = defineProps({
  isShown: Boolean
})

// Определение эмитов компонента
const emits = defineEmits(['closeBtnClick', 'passFilterSet'])

// Получение необходимых данных из хранилища продуктов
const { getMaxPrice, getMinPrice, categoriesData } = useProductsStore()

// Реактивные переменные для хранения значений фильтров
const min = ref(3000)
const max = ref(100000)
const minSliderValue = ref(null)
const maxSliderValue = ref(null)
const priceGap = ref(5000)
const categoriesChecked = ref([])

// Настройки кнопки "Применить" на мобильном фильтре
const mobileFilterBtnSettings = {
  type: 'button',
  text: 'Применить'
}

// Обработчик изменения состояния чекбокса категории
const handleCheckboxChange = (id) => {
  const index = categoriesChecked.value.indexOf(id)

  if (index !== -1) {
    categoriesChecked.value.splice(index, 1)
  } else {
    categoriesChecked.value.push(id)
  }
}

// Вычисляемое свойство для вычисления прогресса минимальной цены в слайдере
const minProgress = computed(() => `${(minSliderValue.value / max.value) * 100}%`)

// Вычисляемое свойство для вычисления ширины полосы выбранного диапазона цен в слайдере
const progressWidth = computed(
  () => `${((maxSliderValue.value - minSliderValue.value) / max.value) * 100}%`
)

// Обработчики изменения минимальной и максимальной цен в слайдере
const handleMinChange = () => {
  switch (true) {
    case maxSliderValue.value >= max.value:
      return
    case minSliderValue.value >= maxSliderValue.value - priceGap.value:
      maxSliderValue.value = minSliderValue.value + priceGap.value
      break
    default:
      break
  }
}

const handleMaxChange = () => {
  switch (true) {
    case minSliderValue.value <= min.value:
      return
    case maxSliderValue.value <= minSliderValue.value + priceGap.value:
      minSliderValue.value = maxSliderValue.value - priceGap.value
      break
    default:
      break
  }
}

// Обработчики изменения значений в полях ввода минимальной и максимальной цен
const handleMinInputChange = () => {
  if (minSliderValue.value < min.value) {
    minSliderValue.value = min.value
  } else if (minSliderValue.value >= maxSliderValue.value) {
    minSliderValue.value = maxSliderValue.value - priceGap.value
  }
}

const handleMaxInputChange = () => {
  if (maxSliderValue.value > max.value) {
    maxSliderValue.value = max.value
  } else if (maxSliderValue.value <= minSliderValue.value) {
    maxSliderValue.value = minSliderValue.value + priceGap.value
  }
}

// Обработчик клика по кнопке закрытия мобильного фильтра
const handleCloseBtnClick = () => {
  emits('closeBtnClick')
}

// Реактивная переменная для хранения состояния переключателя "Показывать только в наличии"
const availableIsChecked = ref(false)

// Обработчик изменения состояния переключателя "Показывать только в наличии"
const handleToggleChange = () => {
  availableIsChecked.value = !availableIsChecked.value
}

// Функция для передачи установленных фильтров
const passFilterSet = () => {
  const filterSettings = {
    categories: categoriesChecked.value,
    available: availableIsChecked.value,
    minPrice: minSliderValue.value,
    maxPrice: maxSliderValue.value
  }

  emits('passFilterSet', filterSettings)
}

// Хук, вызываемый после монтирования компонента
onMounted(() => {
  minSliderValue.value = getMinPrice
  maxSliderValue.value = getMaxPrice
})
</script>

<template>
  <div :class="{ 'filter-mobile': true, isShown: props.isShown }">
    <div class="filter-mobile__title">
      <span>Фильтр</span>
    </div>
    <div class="filter-mobile__categories">
      <div class="filter-mobile__subtitle">
        <span>Категория</span>
      </div>
      <ul class="categories-list">
        <li v-for="item in categoriesData" class="categories-list__item">
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
    <div class="filter-mobile__price">
      <div class="filter-mobile__subtitle">
        <span>Цена</span>
      </div>
      <div class="range-slider">
        <div class="range-slider__slider-price">
          <div class="progress" :style="{ left: minProgress, width: progressWidth }"></div>
        </div>
        <div class="range-slider__range-input">
          <input
            type="range"
            class="range-min"
            :min="min"
            :max="max"
            v-model.number="minSliderValue"
            @input="handleMinChange"
          />
          <input
            type="range"
            class="range-max"
            :min="min"
            :max="max"
            v-model.number="maxSliderValue"
            @input="handleMaxChange"
          />
        </div>
        <div class="range-slider__price-input">
          <div class="range-slider__input-wrapper">
            <div class="range-slider__field range-slider__field--min">
              <input
                type="number"
                class="input-min"
                v-model.number="minSliderValue"
                @input="handleMinInputChange"
              />
            </div>
            <div class="separator">-</div>
            <div class="range-slider__field range-slider__field--max">
              <input
                type="number"
                class="input-max"
                v-model.number="maxSliderValue"
                @input="handleMaxInputChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppToggle :name="'Показывать только в наличии'" @change="handleToggleChange" />
    <AppButton :settings="mobileFilterBtnSettings" @click="passFilterSet" />
    <CloseButton @click="handleCloseBtnClick" />
  </div>
</template>

<style scoped lang="scss">
.filter-mobile {
  display: none;
  flex-direction: column;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(100%);
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: $white;
  overflow-y: auto;
  z-index: 100;
  @include defaultTransition;

  @include media-extra-small {
    display: flex;
  }

  &.isShown {
    transform: translateX(0);
  }
  // .filter-mobile__title
  &__title {
    @include Ms-upper16;
    color: $main;
  }

  // .filter-mobile__categories
  &__categories {
  }

  // .filter-mobile__subtitle
  &__subtitle {
    margin-bottom: 8px;
    @include Ms-m14;
    color: $main;
  }
}
.categories-list {
  max-height: 200px;
  overflow-y: auto;
}
.range-slider {
  margin-top: 32px;

  // .range-slider__block
  &__block {
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  // .range-slider__input-wrapper
  &__input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // .range-slider__price-input
  &__price-input {
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }

  // .range-slider__field
  &__field {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    pointer-events: none;

    // .range-slider__field--min
    &--min {
      &::before {
        content: 'от';
      }
    }

    // .range-slider__field--max
    &--max {
      &::before {
        content: 'до';
      }
    }

    &::before {
      position: absolute;
      top: 11px;
      left: 24px;
      @include Ms-r14;
      color: $base-300;
    }
  }

  // .range-slider__slider-price
  &__slider-price {
    height: 6px;
    position: relative;
    background-color: $base-500;
    border-radius: 16px;
  }

  // .range-slider__range-input
  &__range-input {
    position: relative;

    input {
      position: absolute;
      width: 100%;
      height: 5px;
      top: -5px;
      background: none;
      pointer-events: none;
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type='range']::-webkit-slider-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: $primary-100;
    pointer-events: auto;
    -webkit-appearance: none;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border: none;
    border-radius: 50%;
    background-color: $white;
    pointer-events: auto;
    cursor: pointer;
  }

  input[type='number'] {
    padding: 11px 16px 11px 56px;
    max-width: 122px;
    height: 40px;
    @include Ms-r14;
    color: $base-300;
    outline: none;
    border: none;
    background-color: $base-500;
    border-radius: 8px;
  }
}
.progress {
  left: 0;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  border: none;
  background-color: $primary-100;
  top: 0;
}
.checkbox {
  padding: 10px 0;
  gap: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

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
    width: 20px;
    height: 20px;
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

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 14px;
        height: 14px;
      }
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

.close-btn {
  position: absolute;
  top: 21px;
  right: 20px;
}
</style>
