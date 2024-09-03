import { defineStore } from 'pinia'
import { computed } from 'vue'
import { productsList } from '@/data/products.js'
import { usePromoStore } from '@/stores/promo.js'

export const useProductsStore = defineStore('products', () => {
  // Инициализация массива данных о продуктах
  let productsData = productsList

  // Получение текущей активной акции из хранилища акций
  const { currentPromo } = usePromoStore()

  // Применение скидок к продуктам, если активна акционная скидка
  if (currentPromo) {
    productsData = productsData.map((product) => {
      if (product.promoStatus) {
        const discountPrice = Math.ceil((product.price / 100) * currentPromo.discount)
        product.discountPrice = discountPrice
      }
      return product
    })
  }

  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     ;[array[i], array[j]] = [array[j], array[i]]
  //   }
  //   return array
  // }

  // productsData = shuffleArray(productsData)

  // Вычисление списка уникальных категорий продуктов
  const categoriesData = computed(() => {
    const categories = productsData.map((product) => ({
      id: product.categoryId,
      title: product.categoryTitle,
      imgSrc: product.categoryImg
    }))

    // Удаление дубликатов категорий и преобразование их в массив
    const uniqueCategoriesSet = new Set()

    categories.forEach((category) => {
      uniqueCategoriesSet.add(JSON.stringify(category))
    })

    return Array.from(uniqueCategoriesSet).map((category) => JSON.parse(category))
  })

  // Вычисление максимальной цены продукта
  const getMaxPrice = computed(() => {
    return Math.max(...productsData.map((product) => product.price))
  })

  // Вычисление минимальной цены продукта
  const getMinPrice = computed(() => {
    return Math.min(...productsData.map((product) => product.price))
  })

  // Возвращаемые значения и функции хранилища продуктов
  return {
    productsData,
    categoriesData,
    getMaxPrice,
    getMinPrice
  }
})
