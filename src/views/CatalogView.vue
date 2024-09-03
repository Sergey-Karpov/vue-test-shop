<script setup>
import AppLoader from '@/components/elements/AppLoader.vue'
import SectionTitle from '@/components/elements/SectionTitle.vue'
import ProductCard from '@/components/entities/ProductCard.vue'
import { computed, onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import { useRoute } from 'vue-router'

// Получение параметров маршрута
const route = useRoute()
const categoryId = route.params.id

// Использование хранилища товаров
const { productsData, categoriesData } = useProductsStore()

// Вычисляемое свойство для получения имени категории
const categoryName = computed(() => {
  const currentCategory = categoriesData.find((category) => category.id === +categoryId)
  return currentCategory.title
})

// Ссылка на список товаров и флаг загрузки
const productsList = ref(productsData)
const isLoading = ref(false)

// Функция для получения списка товаров по выбранной категории
const getProductsList = computed(() => {
  isLoading.value = true

  setTimeout(() => {
    productsList.value = productsList.value.filter((item) => item.categoryId === +categoryId)

    isLoading.value = false
  }, 3000)
})

// Хук для выполнения при монтировании компонента
onMounted(() => {
  getProductsList.value
})
</script>

<template>
  <section class="catalog">
    <div class="catalog__container">
      <div class="catalog__content">
        <SectionTitle :title="categoryName" />
        <AppLoader v-if="isLoading" />
        <div v-else class="catalog__grid">
          <ProductCard v-for="item in productsList" :product="item" />
        </div>
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

  // .catalog__grid
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    @include media-large {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media-small {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @include media-extra-small {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
