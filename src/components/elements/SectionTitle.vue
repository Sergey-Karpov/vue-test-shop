<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String
})
</script>

<template>
  <div class="section-title">
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped lang="scss">
.section-title {
  margin-bottom: 20px;

  @include media-large {
    margin-bottom: 12px;
  }

  h2 {
    @include Ms-upper48;
    color: $main;

    @include media-large {
      @include Ms-upper40;
    }

    @include media-medium {
      @include Ms-upper32;
    }
  }
}
</style>
