<script setup>
import CategoryCard from '@/components/entities/CategoryCard.vue'
import HeroBanner from '@/components/entities/HeroBanner.vue'
import PromoTimer from '@/components/entities/PromoTimer.vue'
import { useProductsStore } from '@/stores/products.js'
import { usePromoStore } from '@/stores/promo.js'
import { computed } from 'vue'

// Использование хранилищ продуктов и промо-акций
const { categoriesData } = useProductsStore()
const { mainPromo, currentPromo } = usePromoStore()

// Вычисляемое свойство для получения первых трех категорий
const firstThreeCategories = computed(() => categoriesData.slice(0, 3))
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__grid">
        <HeroBanner :banner="mainPromo" />
        <PromoTimer :promo="currentPromo" />
        <CategoryCard
          v-for="category in firstThreeCategories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  // .hero__grid
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 292px);
    gap: 24px;

    @include media-large {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 270px);
    }

    @include media-medium {
      grid-template-rows: repeat(3, 240px);
      gap: 16px;
    }

    @include media-small {
      grid-template-rows: repeat(3, 160px);
    }

    @include media-extra-small {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, auto);
    }

    & > *:first-child {
      grid-column: span 3;
      grid-row: span 2;

      @include media-large {
        grid-column: span 2;
      }

      @include media-extra-small {
        grid-column: span 1;
        grid-row: span 1;
      }
    }

    a:nth-child(2) {
      grid-row: span 3;

      @include media-large {
        grid-row: span 2;
      }

      @include media-extra-small {
        grid-row: span 1;
      }
    }
  }
}
</style>
