<template>
  <router-link :to="{ name: 'promo' }" class="banner">
    <picture>
      <source :srcset="banner.large" type="image/png" media="(max-width: 1660px)" />
      <source :srcset="banner.pc" type="image/png" media="(max-width: 1279px)" />
      <source :srcset="banner.tablet" type="image/png" media="(max-width: 991px)" />
      <source
        :srcset="banner.mobile"
        type="image/png"
        media="(min-width: 767px) and (max-width: 991px)"
      />
      <source
        :srcset="banner.min"
        type="image/png"
        media="(min-width: 0px) and (max-width: 767px)"
      />
      <img :src="banner.default" alt="promo banner" />
    </picture>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  banner: Object
})
</script>

<style scoped lang="scss">
.banner {
  position: relative;
  min-height: 240px;
  border-radius: 16px;
  overflow: hidden;

  picture {
    position: absolute;
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
