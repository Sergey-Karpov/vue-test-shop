<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  category: Object
})
</script>

<template>
  <router-link :to="{ name: 'catalog', params: { id: category.id } }" class="category">
    <div class="category__inner">
      <div class="category__img">
        <img :src="category.imgSrc" alt="category image" />
      </div>
      <div class="category__title">
        <h3>
          {{ category.title }}
        </h3>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.category {
  position: relative;
  min-height: 300px;
  border-radius: 16px;
  overflow: hidden;
  background-color: $base-500;

  @include media-medium {
    min-height: 240px;
  }

  @include media-small {
    min-height: 160px;
  }

  // .category__inner
  &__inner {
    padding: 24px;
    display: flex;

    @include media-medium {
      padding: 20px;
    }
  }
  // .category__img
  &__img {
    position: absolute;
    top: 50%;
    right: 0;
    height: 100%;
    transform: translateY(-50%);
    pointer-events: none;

    img {
      max-height: 100%;
      object-fit: contain;
    }
  }

  // .category__title

  &__title {
    justify-self: flex-start;
    align-self: flex-start;
    pointer-events: none;

    h3 {
      @include Ms-upper24;

      @include media-medium {
        @include Ms-upper20;
      }
    }
  }
}
</style>
