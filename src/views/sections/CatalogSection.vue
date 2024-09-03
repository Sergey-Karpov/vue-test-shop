<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import SectionTitle from '@/components/elements/SectionTitle.vue'
import AppFilter from '@/components/chapters/AppFilter.vue'
import FilterMobile from '@/components/chapters/FilterMobile.vue'
import ProductsSlider from '@/components/chapters/ProductsSlider.vue'
import { useProductsStore } from '@/stores/products.js'

const { productsData } = useProductsStore()

// Создание реактивной ссылки на отфильтрованный список продуктов
const filteredList = ref(productsData)
// Создание реактивных ссылок на текущие выбранные категории, доступность и диапазон цен
const currentCategories = ref([])
const availableIsChecked = ref(false)
const currentPriceRange = reactive({})
// Создание реактивной ссылки на состояние отображения мобильного фильтра
const mobileFilterIsSHown = ref(false)

// Функция для фильтрации продуктов на основе выбранных параметров
const filterProducts = () => {
  let filteredProducts = productsData

  if (currentCategories.value.length > 0) {
    filteredProducts = filteredProducts.filter((item) =>
      currentCategories.value.includes(item.categoryId)
    )
  }

  if (availableIsChecked.value) {
    filteredProducts = filteredProducts.filter((item) => item.available)
  }

  if (currentPriceRange.minPriceValue && currentPriceRange.maxPriceValue) {
    filteredProducts = filteredProducts.filter((product) => {
      const priceToCheck = product.promoStatus ? product.discountPrice : product.price
      return (
        priceToCheck >= currentPriceRange.minPriceValue &&
        priceToCheck <= currentPriceRange.maxPriceValue
      )
    })
  }

  filteredList.value = filteredProducts
}

// Обработчик изменения выбранных категорий
const handleSelectChange = (checkedValue) => {
  currentCategories.value = checkedValue
  filterProducts()
}

// Обработчик изменения состояния доступности
const handleAvailableToggle = (isChecked) => {
  availableIsChecked.value = isChecked
  filterProducts()
}

// Обработчик изменения диапазона цен
const handlePriceChange = (priceFilterValue) => {
  currentPriceRange.minPriceValue = priceFilterValue.minPriceValue
  currentPriceRange.maxPriceValue = priceFilterValue.maxPriceValue
  filterProducts()
}

// Обработчик изменения параметров мобильного фильтра
const handleMobileFilterChange = (filterSet) => {
  const { categories, available, minPrice, maxPrice } = filterSet

  let filteredProducts = productsData

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter((item) => categories.includes(item.categoryId))
  }

  if (available) {
    filteredProducts = filteredProducts.filter((item) => item.available)
  }

  if (minPrice && maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      const priceToCheck = product.promoStatus ? product.discountPrice : product.price
      return priceToCheck >= minPrice && priceToCheck <= maxPrice
    })
  }

  filteredList.value = filteredProducts

  closeMobileFilter()
}

// Выполнение фильтрации продуктов при монтировании компонента
onMounted(() => {
  filterProducts()
})

// Обработчик изменения состояния фильтров
watch([() => AppFilter.checkedValue, () => AppFilter.isChecked], ([checkedValue, isChecked]) => {
  handleSelectChange(checkedValue)
  handleAvailableToggle(isChecked)
})

// Функция для открытия мобильного фильтра
const toggleMobileFilter = () => {
  mobileFilterIsSHown.value = true
  document.body.style.overflow = 'hidden'
}

// Функция для закрытия мобильного фильтра
const closeMobileFilter = () => {
  mobileFilterIsSHown.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <section class="catalog">
    <div class="catalog__container">
      <div class="catalog__content">
        <SectionTitle :title="'Каталог'" />
        <button @click="toggleMobileFilter" class="filter-mobile-btn">Фильтр</button>
        <AppFilter
          @changeToggle="handleAvailableToggle"
          @changeSelect="handleSelectChange"
          @changePrice="handlePriceChange"
        />
        <ProductsSlider :products="filteredList" />
        <FilterMobile
          :isShown="mobileFilterIsSHown"
          @closeBtnClick="closeMobileFilter"
          @passFilterSet="handleMobileFilterChange"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.catalog {
  // .catalog__container
  &__container {
  }

  // .catalog__content
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;

    @include media-small {
      gap: 16px;
    }
  }
}
.filter-mobile-btn {
  padding: 11px 16px;
  color: $main;
  width: fit-content;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: $base-500;
  height: 40px;
  @include Ms-r14;
  @include defaultTransition;
  display: none;

  @include media-extra-small {
    display: block;
  }
}
</style>
