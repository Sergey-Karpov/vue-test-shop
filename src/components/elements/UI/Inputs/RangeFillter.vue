<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useProductsStore } from '@/stores/products'
const { getMaxPrice, getMinPrice } = useProductsStore()

// Реактивные переменные для хранения значений минимальной и максимальной цен
const min = ref(3000)
const max = ref(100000)

// Реактивные переменные для хранения значений выбранных пользователем цен
const minSliderValue = ref(null)
const maxSliderValue = ref(null)
// Реактивная переменная для хранения значения разницы между минимальной и максимальной ценами
const priceGap = ref(5000)

const emits = defineEmits(['change'])

// Реактивная переменная для отображения/скрытия блока выбора цен
const isShown = ref(false)

// Обработчик изменений переменной isShown
watch(isShown, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    emits('change', { minPriceValue: minSliderValue.value, maxPriceValue: maxSliderValue.value })
  }
})

const handleButtonClick = () => {
  isShown.value = !isShown.value
}

// Реактивная переменная для хранения ширины прогресс-бара в зависимости от выбранных цен
const minProgress = computed(() => `${(minSliderValue.value / max.value) * 100}%`)
const progressWidth = computed(
  () => `${((maxSliderValue.value - minSliderValue.value) / max.value) * 100}%`
)

// Функции для обработки изменения значений ползунков и полей ввода
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

// Функция для обработки клика вне блока выбора цен для его скрытия
const handleClickOutside = (event) => {
  if (refDropdown.value && !refDropdown.value.contains(event.target)) {
    isShown.value = false
  }
}

// Реактивная ссылка на элемент блока выбора цен
const refDropdown = ref(null)

// Хук, вызываемый после монтирования компонента
onMounted(() => {
  minSliderValue.value = getMinPrice
  maxSliderValue.value = getMaxPrice

  refDropdown.value = document.querySelector('.range-slider__block')
  document.addEventListener('click', handleClickOutside)
})

// Хук, вызываемый перед удалением компонента из DOM
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="range-slider">
    <button
      @click.stop="handleButtonClick"
      :class="{ 'range-slider__button': true, active: isShown }"
    >
      Цена, ₽
    </button>
    <div :class="{ 'range-slider__block': true, isShown: isShown }">
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
</template>

<style scoped lang="scss">
.range-slider {
  position: relative;

  // .range-slider__button
  &__button {
    padding: 15px 24px;
    @include Ms-r20;
    color: $main;
    border: 1px solid transparent;
    border-radius: 8px;
    background-color: $base-500;
    @include defaultTransition;

    @include hover {
      border-color: $primary-100;
    }

    @include media-medium {
      height: 48px;
      @include Ms-r18;
    }

    @include media-small {
      height: 40px;
      @include Ms-r14;
      padding: 11px 16px;
    }
    &.active {
      border-color: $main;
    }
  }

  // .range-slider__block
  &__block {
    position: absolute;
    left: 0;
    top: calc(100% + 4px);
    z-index: 100;
    max-width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background-color: $white;
    border-radius: 16px;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    box-shadow: 2px 4px 12px 0px rgba(11, 11, 11, 0.1);
    @include defaultTransition;

    &.isShown {
      opacity: 1;
      pointer-events: all;
      visibility: visible;
    }
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
      top: 15px;
      left: 24px;
      @include Ms-r20;
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
    padding: 15px 16px 15px 56px;
    max-width: 156px;
    height: 56px;
    @include Ms-r20;
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
</style>
