<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/chapters/AppHeader.vue'
import AppFooter from './components/chapters/AppFooter.vue'
import AppModal from '@/components/elements/UI/Modal/AppModal.vue'
</script>

<template>
  <div class="full-wrapper">
    <AppHeader />
    <div class="page-content">
      <RouterView />
    </div>
    <AppFooter />
  </div>
  <AppModal />
</template>

<style scoped lang="scss"></style>
