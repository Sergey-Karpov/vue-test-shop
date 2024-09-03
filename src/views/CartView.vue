<script setup>
import AppLoader from '@/components/elements/AppLoader.vue'
import SectionTitle from '@/components/elements/SectionTitle.vue'
import CartItem from '@/components/entities/CartItem.vue'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { formatePrice } from '@/helpers/utils'

// Использование хранилища корзины
const { removeProductFromCart, cartList } = useCartStore()

// Ссылка на текущий список товаров в корзине и флаг загрузки
const currentCartList = ref([])
const isLoading = ref(false)

// Функция для получения списка товаров в корзине
const getCartList = () => {
  isLoading.value = true

  setTimeout(() => {
    currentCartList.value = cartList
    isLoading.value = false
  }, 3000)
}

// Вычисляемое свойство для расчета суммы товаров в корзине
const cartSum = computed(() => {
  return currentCartList.value.reduce((total, item) => {
    const priceToAdd = item.discountPrice ?? item.price
    return total + priceToAdd
  }, 0)
})

// Хук для выполнения при монтировании компонента
onMounted(() => {
  getCartList()
})
</script>

<template>
  <section class="cart">
    <div class="cart__container">
      <SectionTitle :title="'Корзина'" />
      <div class="cart__content">
        <AppLoader v-if="isLoading" />
        <div v-else-if="!isLoading && currentCartList.length" class="cart__volume">
          <div class="cart__grid">
            <CartItem
              v-for="item in currentCartList"
              :item="item"
              @remove:item="removeProductFromCart(item)"
            />
          </div>
          <div class="cart-calc">
            <div class="cart-calc__prop">
              <div class="cart-calc__title">
                <span>Колличество товаров:</span>
              </div>
              <div class="cart-calc__value">
                <span>{{ currentCartList.length }}</span>
              </div>
            </div>
            <div class="cart-calc__prop">
              <div class="cart-calc__title">
                <span>Сумма</span>
              </div>
              <div class="cart-calc__value">
                <span>{{ formatePrice(cartSum) }} ₽</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-cart">
          <div class="empty-cart__title">Your Cart Is Empty</div>
          <RouterLink :to="{ name: 'home' }">
            <span class="empty-cart__link">Return to main</span>
          </RouterLink>
          <div class="empty-cart__image">
            <img src="./../assets/images/cart/empty-cart.png" alt="empty cart" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart {
  // .cart__content
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  // .cart__volume
  &__volume {
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 48px;

    @include media-medium {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  // .catalog__grid
  &__grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

.cart-calc {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;

  // .cart-calc__prop
  &__prop {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  // .cart-calc__title
  &__title {
    @include Ms-m20;
    color: $main;
  }

  // .cart-calc__value
  &__value {
    @include Ms-upper24;
    color: $main;
  }
}

.empty-cart {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
  // .empty-cart__title

  &__title {
    @include Ms-upper24;
    color: $main;
  }

  // .empty-cart__link
  &__link {
    @include Ms-m20;
    color: $primary-200;
  }

  // .empty-cart__image
  &__image {
  }
}
</style>
