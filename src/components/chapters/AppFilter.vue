<script setup>
// Импортируем необходимые компоненты и функции из Vue и хранилища продуктов
import FilterSelect from '@/components/elements/UI/Inputs/FilterSelect.vue'
import AppToggle from '@/components/elements/UI/Inputs/AppToggle.vue'
import RangeFillter from '../elements/UI/Inputs/RangeFillter.vue'
import { useProductsStore } from '@/stores/products.js'
import { reactive, ref } from 'vue'

// Получаем данные о категориях из хранилища продуктов
const { categoriesData } = useProductsStore()

// Создаем реактивную ссылку на данные для фильтра по категориям
const categoryFilterData = ref({
  placeholder: 'Категория',
  items: categoriesData
})

// Определяем события, которые будут эмиттироваться из компонента
const emits = defineEmits(['changeToggle', 'changeSelect', 'changePrice'])

// Создаем реактивную переменную для хранения состояния переключателя
const isChecked = ref(false)

// Функция обработки изменения состояния переключателя
const handleToggleChange = () => {
  isChecked.value = !isChecked.value
  // Эмитируем событие изменения состояния переключателя и передаем новое значение
  emits('changeToggle', isChecked.value)
}

// Создаем реактивную переменную для хранения выбранных значений фильтра по категориям
const filterCheckedValue = ref([])

// Функция обработки изменения выбранных значений фильтра по категориям
const handleSelectChange = (checkedValue) => {
  filterCheckedValue.value = checkedValue
  // Эмитируем событие изменения выбранных значений фильтра по категориям и передаем их
  emits('changeSelect', filterCheckedValue.value)
}

// Создаем реактивный объект для хранения настроек фильтра по цене
const rangeSliderSettings = reactive({})

// Функция обработки изменения настроек фильтра по цене
const handlePriceChange = (priceFilterValue) => {
  rangeSliderSettings.value = priceFilterValue
  // Эмитируем событие изменения настроек фильтра по цене и передаем их
  emits('changePrice', rangeSliderSettings.value)
}
</script>

<template>
  <div class="filters">
    <div class="filters__right">
      <FilterSelect @change="handleSelectChange" :select="categoryFilterData" />
      <RangeFillter @change="handlePriceChange" />
    </div>
    <AppToggle @change="handleToggleChange" :name="'Показывать только в наличии'" />
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @include media-extra-small {
    display: none;
  }

  // .
  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
