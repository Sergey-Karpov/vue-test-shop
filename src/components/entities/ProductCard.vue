<script setup>
import { defineProps, computed } from 'vue'
import { formatePrice } from '@/helpers/utils'

const props = defineProps({
  product: Object
})
</script>

<template>
  <div :class="{ 'product-card': true, unavailable: !props.product.available }">
    <div class="product-card__img">
      <img :src="product.imageSrc[0]" :alt="product.title" />
    </div>
    <div class="product-card__description">
      <div class="product-card__price">
        <div v-if="product.promoStatus" class="price--current">
          <span>{{ formatePrice(product.discountPrice) }} ₽</span>
        </div>
        <div :class="{ 'price--full': true, 'has-discount': product.promoStatus }">
          <span>{{ formatePrice(product.price) }} ₽</span>
        </div>
      </div>
      <div class="product-card__title">
        <span>
          {{ product.title }}
        </span>
      </div>
    </div>
    <div v-if="!props.product.available" class="product-card__waiting">
      <span>waiting-list</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  cursor: pointer;

  @include media-small {
    gap: 12px;
  }

  &.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }

  // .product-card__description
  &__description {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include media-small {
      gap: 8px;
    }
  }

  // .product-card__img
  &__img {
    position: relative;
    min-height: 520px;
    height: 520px;
    overflow: hidden;
    border-radius: 16px;

    @include media-large {
      min-height: 440px;
      height: 440px;
    }

    @include media-medium {
      min-height: 400px;
      height: 400px;
    }

    @include media-small {
      min-height: 300px;
      height: 300px;
    }

    @media screen and (max-width: 500px) {
      min-height: 132px;
      height: 132px;
    }

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  // .product-card__price
  &__price {
    display: flex;
    gap: 12px;

    @include media-small {
      gap: 8px;
    }
  }

  // .product-card__title
  &__title {
    @include Ms-r20;
    color: $main;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }

  // .product-card__waiting
  &__waiting {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include Ms-upper64;
    z-index: 2;
    opacity: 1;

    @include media-large {
      @include Ms-upper40;
    }

    @include media-medium {
      @include Ms-upper32;
    }

    @include media-small {
      @include Ms-upper20;
    }

    @include media-extra-small {
      @include Ms-upper16;
    }

    span {
      text-align: center;
    }
  }
}
.price--current {
  span {
    @include Ms-m20;
    color: $main;

    @include media-medium {
      @include Ms-m18;
    }

    @include media-small {
      @include Ms-m14;
    }
  }
}
.price--full {
  span {
    @include Ms-m20;
    color: $main;

    @include media-medium {
      @include Ms-m18;
    }

    @include media-small {
      @include Ms-m14;
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
</style>
