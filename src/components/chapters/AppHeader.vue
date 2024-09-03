<script setup>
import UserButton from '@/components/elements/UI/Buttons/UserButton.vue'
import CartLink from '@/components/elements/UI/Links/CartLink.vue'
import HeaderLogo from '@/components/elements/HeaderLogo.vue'
import { useModalStore } from '@/stores/modal.js'

const modalStore = useModalStore()
</script>

<template>
  <header class="header fixed">
    <div class="header__container">
      <div class="header__inner">
        <UserButton @click.stop="modalStore.showModal()" />
        <HeaderLogo />
        <CartLink />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $main;
  z-index: 50;

  // .header__container
  &__container {
  }

  // .header__inner
  &__inner {
    padding: 23px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media-small {
      padding: 16px 0;
    }
  }
}
</style>
