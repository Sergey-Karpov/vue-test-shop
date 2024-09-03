import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Создание реактивной ссылки на массив элементов корзины
  const cartList = ref([])

  // Функция для добавления продукта в корзину
  const addProductToCart = (product) => {
    if (cartList.value.some((item) => item.id === product.id)) {
      return
    }
    cartList.value.push(product)
  }

  // Функция для удаления продукта из корзины
  const removeProductFromCart = (product) => {
    const index = cartList.value.findIndex((item) => item.id === product.id)

    if (index !== -1) {
      cartList.value.splice(index, 1)
    }
  }

  // Возвращаемые значения и функции хранилища корзины
  return {
    cartList,
    addProductToCart,
    removeProductFromCart
  }
})
