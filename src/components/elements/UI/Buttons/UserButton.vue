<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.'

const userStore = useUserStore()

// состояние статуса login
const userStatus = computed(() => {
  return userStore.userData
})
</script>

<template>
  <button :class="{ 'login-btn': true, active: userStatus !== null }">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="9.33333" r="5.33333" stroke="white" />
      <path
        d="M26.6667 28C26.6667 22.109 21.891 17.3333 16 17.3333C10.109 17.3333 5.33333 22.109 5.33333 28"
        stroke="white"
      />
    </svg>
  </button>
</template>

<style scoped lang="scss">
.login-btn {
  svg {
    @include media-small {
      width: 24px;
      height: 24px;
    }
  }
  &.active {
    svg {
      circle,
      path {
        stroke: greenyellow;
      }
    }
  }
}
</style>
