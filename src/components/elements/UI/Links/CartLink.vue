<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()

const cartListLength = computed(() => cartStore.cartList.length)
</script>

<template>
  <router-link :to="{ name: 'cart' }">
    <i class="cart-icon">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.89054 6.2093C7.9531 5.70887 8.3785 5.33333 8.88282 5.33333H23.1173C23.6216 5.33333 24.047 5.70887 24.1095 6.2093L26.5262 25.5426C26.6008 26.1395 26.1354 26.6667 25.5339 26.6667H6.46616C5.86466 26.6667 5.39927 26.1395 5.47388 25.5426L7.89054 6.2093Z"
          stroke="white"
        />
        <path d="M20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8" stroke="white" />
      </svg>
      <div v-if="cartListLength" class="cart-icon__display">
        {{ cartListLength }}
      </div>
    </i>
  </router-link>
</template>

<style scoped lang="scss">
.cart-icon {
  position: relative;

  svg {
    @include media-small {
      height: 24px;
      width: 24px;
    }
  }

  // .cart-icon__display
  &__display {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(40%, -75%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: $primary-200;
    border-radius: 50%;
    color: $white;

    @include media-small {
      width: 18px;
      height: 18px;
      @include Ms-r14;
    }
  }
}
</style>
