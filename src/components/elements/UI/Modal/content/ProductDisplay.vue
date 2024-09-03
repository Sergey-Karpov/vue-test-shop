<script setup>
import { computed, ref, defineProps, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import AppButton from '@/components/elements/UI/Buttons/AppButton.vue'
import { formatePrice } from '@/helpers/utils'

const { addProductToCart } = useCartStore()

const props = defineProps({
  product: Object
})

const emits = defineEmits(['addProductToCart'])

// Реактивные переменные для выбранного цвета и размера
const selectedColor = ref(null)
const selectedSize = ref(null)

// Функция для добавления выбранного продукта в корзину
const selectProduct = () => {
  const selectedProduct = {
    id: props.product.id,
    title: props.product.title,
    img: props.product.imageSrc[0],
    color: selectedColor.value,
    size: selectedSize.value,
    price: props.product.price
  }

  // Если продукт имеет скидку, добавляем соответствующее поле в объект продукта
  if (props.product.promoStatus) {
    selectedProduct.discountPrice = props.product.discountPrice
  }

  addProductToCart(selectedProduct)

  emits('addProductToCart')
}

// Установка значений по умолчанию при монтировании компонента
onMounted(() => {
  selectedColor.value = props.product.colors[0]
  selectedSize.value = props.product.sizes[0]
})
</script>

<template>
  <div v-if="props.product" class="product">
    <div class="product__img">
      <img :src="product.imageSrc[0]" :alt="product.title" />
    </div>
    <div class="product__property">
      <div class="product__title">
        <span>
          {{ product.title }}
        </span>
      </div>
      <div class="product__prop">
        <div class="product__prop-title">
          <span>Цвет:</span>
        </div>
        <div class="product__prop-list">
          <div v-for="(color, index) in product.colors" class="color" :key="color">
            <label class="color__item">
              <input
                type="radio"
                class="radio--hidden"
                :name="'product' + product.id + '-color'"
                :value="color"
                v-model="selectedColor"
                :checked="index === 0"
              />
              <div class="color__button" type="button" :style="{ backgroundColor: color }">
                <span :style="{ border: '1px solid ' + color }"></span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="product__prop">
        <div class="product__prop-title">
          <span>Размер:</span>
        </div>
        <div class="product__prop-list">
          <div v-for="(size, index) in product.sizes" class="size" :key="size">
            <label class="size__item">
              <input
                type="radio"
                class="radio--hidden"
                name="product-size"
                :value="size"
                v-model="selectedSize"
                :checked="index === 0"
              />
              <div class="size__button" type="button">
                {{ size }}
                <span></span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="product__prop">
        <div class="product__prop-title">
          <span>Описание:</span>
        </div>
        <div class="product__description">
          <p>{{ product.description }}</p>
        </div>
      </div>
      <div class="product__price">
        <div v-if="product.promoStatus" class="price--current">
          <span>{{ formatePrice(product.discountPrice) }} ₽</span>
        </div>
        <div :class="{ 'price--full': true, 'has-discount': product.promoStatus === true }">
          <span>{{ formatePrice(product.price) }} ₽</span>
        </div>
      </div>
      <AppButton
        :settings="{ text: 'Добавить в корзину', type: 'submit' }"
        @click="selectProduct"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  display: flex;
  align-items: stretch;
  gap: 40px;

  @include media-extra-small {
    flex-direction: column;
    gap: 20px;
  }

  // .product__img
  &__img {
    min-height: 390px;

    @include media-extra-small {
      display: flex;
      justify-content: center;
      max-height: 360px;
    }

    img {
      @include media-extra-small {
        max-height: 360px;
        width: auto;
      }
    }
  }

  // .product__property
  &__property {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    @include media-extra-small {
      gap: 20px;
    }
  }

  // .product__title
  &__title {
    span {
      @include Ms-upper24;
      color: $main;
    }
  }

  // .product__prop
  &__prop {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    @include media-extra-small {
      gap: 8px;
    }
  }

  // .product__prop-title
  &__prop-title {
    @include Ms-m20;
    color: $main;

    @include media-extra-small {
      @include Ms-m14;
    }
  }

  // .product__prop-list
  &__prop-list {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  // .product__price
  &__price {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  // .product__description
  &__description {
    p {
      @include Ms-r18;
      color: $main;

      @include media-extra-small {
        @include Ms-r14;
      }
    }
  }
}
.color {
  // .color__item
  &__item {
    position: relative;
    cursor: pointer;
  }

  // .color__button
  &__button {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    @include media-extra-small {
      width: 16px;
      height: 16px;
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 133%;
      height: 133%;
      border-radius: 50%;
      opacity: 0;
      @include defaultTransition;
    }
  }
}
.radio--hidden {
  position: absolute;
  appearance: none;

  &:checked {
    & + .color__button {
      span {
        opacity: 1;
      }
    }
    & + .size__button {
      color: $main;
      border-color: currentColor;
    }
  }
}
.size {
  // .size__item
  &__item {
    position: relative;
    cursor: pointer;
  }

  // .size__button
  &__button {
    position: relative;
    @include Ms-r20;
    color: $base-300;
    border-bottom: 1px solid transparent;
    @include defaultTransition;

    @include media-extra-small {
      @include Ms-r14;
    }
  }
}
.price {
  // .price--current
  &--current {
    span {
      @include Ms-upper24;
      color: $main;

      @include media-medium {
        @include Ms-upper20;
      }

      @include media-small {
        @include Ms-upper16;
      }
    }
  }
  // .price--full
  &--full {
    span {
      @include Ms-upper24;
      color: $main;

      @include media-medium {
        @include Ms-upper20;
      }

      @include media-small {
        @include Ms-upper16;
      }
    }
    &.has-discount {
      span {
        @include Ms-r20;
        color: $base-300;
        text-decoration: line-through;

        @include media-medium {
          @include Ms-r18;
        }

        @include media-small {
          @include Ms-r14;
        }
      }
    }
  }
}
</style>
