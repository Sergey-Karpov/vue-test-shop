<script setup>
import { defineProps } from 'vue'
import { formatePrice } from '@/helpers/utils'

const props = defineProps({
  item: Object
})

const emits = defineEmits(['remove:item'])

const removeItem = () => {
  emits('remove:item')
}
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__inner">
      <div class="cart-item__img">
        <img :src="item.img" :alt="item.title" />
      </div>
      <div class="cart-item__description">
        <div class="cart-item__title">
          <span>{{ item.title }}</span>
        </div>
        <div class="cart-item__prop">
          <div class="cart-item__prop-title">
            <span>Цвет:</span>
          </div>
          <div class="cart-item__color" :style="{ backgroundColor: item.color }"></div>
        </div>
        <div class="cart-item__prop">
          <div class="cart-item__prop-title">
            <span>Размер:</span>
          </div>
          <div class="cart-item__size">{{ item.size }}</div>
        </div>
        <div class="cart-item__prop">
          <div class="price">
            <span v-if="item.discountPrice !== null && item.discountPrice"
              >{{ formatePrice(item.discountPrice) }} ₽</span
            >
            <span v-else>{{ formatePrice(item.price) }} ₽</span>
          </div>
        </div>
      </div>
      <button type="button" class="cart-item__remove" @click="removeItem">
        <i class="material-icons cart-item__remove-icon">close</i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-item {
  // .cart-item__inner
  &__inner {
    padding-right: 48px;
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 24px;

    @include media-extra-small {
      flex-direction: column;
      gap: 16px;
    }
  }

  // .cart-item__description
  &__description {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @include media-small {
      gap: 24px;
    }

    @include media-extra-small {
      gap: 8px;
    }
  }

  // .cart-item__title
  &__title {
    span {
      @include Ms-upper24;
      color: $main;

      @include media-small {
        @include Ms-upper20;
      }
    }
  }

  // .cart-item__color
  &__color {
    width: 32px;
    height: 32px;
    border-radius: 50%;

    @include media-small {
      width: 24px;
      height: 24px;
    }
  }

  // .cart-item__size
  &__size {
    @include Ms-m20;
    color: $main;
  }

  // .cart-item__prop
  &__prop {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  // .cart-item__prop-title
  &__prop-title {
    @include Ms-m20;
    color: $main;
  }

  // .cart-item__remove
  &__remove {
    position: absolute;
    top: 32px;
    right: 32px;

    @include media-medium {
      top: 24px;
      right: 24px;
    }

    @include media-extra-small {
      top: 0;
      right: 0;
    }
  }

  // .cart-item__remove-icon
  &__remove-icon {
    font-size: 52px;
  }
}

.price {
  @include Ms-upper48;
  color: $main;

  @include media-medium {
    @include Ms-upper24;
  }
}
</style>
