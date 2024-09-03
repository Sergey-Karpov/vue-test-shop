<script setup>
import { defineProps } from 'vue'
import CountdownTimer from '../elements/CountdownTimer.vue'

const props = defineProps({
  promo: Object
})
</script>

<template>
  <router-link :to="{ name: 'promo' }" class="promo-timer">
    <div class="promo-timer__inner">
      <div class="promo-timer__text">
        <div class="promo-timer__desc">
          <span>{{ promo.name }}</span>
        </div>
        <div class="promo-timer__title">
          <span>{{ promo.title }}</span>
        </div>
      </div>
      <CountdownTimer :endDate="promo.endDate" />
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.promo-timer {
  border-radius: 16px;
  background-color: $primary-100;
  overflow: hidden;

  // .promo-timer__inner
  &__inner {
    min-height: 100%;
    padding: 64px 30px;
    display: grid;
    grid-template-rows: auto auto;

    @include media-large {
      padding: 40px 29px;
    }

    @include media-medium {
      padding: 32px 16px;
    }

    @include media-small {
      padding: 24px 9px;
    }

    @include media-extra-small {
      padding: 16px;
    }
  }

  // .promo-timer__text
  &__text {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;

    @include media-large {
      justify-content: flex-start;
    }

    @include media-extra-small {
      gap: 4px;
    }
  }

  // .promo-timer__desc
  &__desc {
    text-align: center;
    @include Ms-upper24;
    color: $white;

    @include media-medium {
      @include Ms-upper20;
    }

    @include media-small {
      @include Ms-upper16;
    }

    @include media-extra-small {
      @include Ms-upper14;
    }
  }

  // .promo-timer__title
  &__title {
    text-align: center;
    @include Ms-upper64;
    color: $white;

    @include media-large {
      @include Ms-upper48;
    }

    @include media-medium {
      @include Ms-upper40;
    }

    @include media-small {
      @include Ms-upper32;
    }

    @include media-extra-small {
      @include Ms-upper24;
    }
  }
}
</style>
