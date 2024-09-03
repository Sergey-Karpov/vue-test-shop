<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import { useModalStore } from '@/stores/modal.js'
import { useProductsStore } from '@/stores/products.js'
import CloseButton from '@/components/elements/UI/Buttons/CloseButton.vue'
import ProductDisplay from '@/components/elements/UI/Modal/content/ProductDisplay.vue'
import LoginForm from '@/components/elements/UI/Modal/content/LoginForm.vue'

const props = defineProps({
  modalActive: Boolean
})

const { productsData } = useProductsStore()

// Реактивная переменная для хранения выбранного продукта для отображения в модальном окне
const productForDisplay = ref(null)

// Получение экземпляра хранилища модального окна
const modalStore = useModalStore()

// Реактивная переменная для отслеживания активности модального окна
const modalIsActive = ref(modalStore.modalIsActive)

// Реактивная переменная для хранения ID текущего выбранного продукта
const currentProdId = ref(null)

// Функция для закрытия модального окна
const closeModal = modalStore.closeModal

// Функция обработки клика за пределами модального окна
const handleClickOutside = (event) => {
  if (modalIsActive.value && !event.target.closest('.modal-window')) {
    closeModal()
  }
}

// Отслеживание изменений активности модального окна
watch(
  () => modalStore.modalIsActive,
  (newValue) => {
    modalIsActive.value = newValue
    if (newValue) {
      currentProdId.value = modalStore.currentIdForDisplay
      productForDisplay.value = productsData.find((product) => product.id === currentProdId.value)
    }
  }
)

// Добавление обработчика события клика при монтировании компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// Удаление обработчика события клика при размонтировании компонента
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <transition name="modal-animation">
    <div v-show="modalIsActive" class="modal">
      <transition name="modal-animation-inner">
        <div :class="{ 'modal-window': true, 'modal-window--product': currentProdId !== null }">
          <ProductDisplay
            v-if="currentProdId !== null"
            :product="productForDisplay"
            @addProductToCart="closeModal"
          />

          <LoginForm v-else @login="closeModal" />

          <CloseButton @click="closeModal" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: translate(-50%, -50%) scale(0.8);
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(11, 11, 11, 0.2);
  z-index: 100;
}
.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  min-width: 500px;
  background-color: $base-500;
  border-radius: 16px;
  overflow-y: auto;

  @include media-extra-small {
    top: unset;
    bottom: 0;
    left: 0;
    transform: translate(0, 0);
    width: 100%;
    min-width: 100%;
    height: fit-content;
    padding: 16px;
  }

  // .modal-window--product
  &--product {
    @include media-large {
      width: 90%;
    }

    @include media-extra-small {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
  }
}
</style>
