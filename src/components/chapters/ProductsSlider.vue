<script setup>
// Импорт необходимых библиотек и компонентов
import { Swiper } from 'swiper'
import { onMounted, computed, ref, watch, defineProps } from 'vue'
import 'swiper/swiper-bundle.css'
import ProductCard from '@/components/entities/ProductCard.vue'
import { usePromoStore } from '@/stores/promo.js'
import { useModalStore } from '@/stores/modal.js'

// Получение данных о текущей акции из хранилища акций
const { currentPromo } = usePromoStore()

// Вычисление скидки для отображения на карточке продукта
const discountValue = computed(() => {
  return currentPromo.discount !== NaN ? currentPromo.discount : 0
})

// Определение пропсов компонента
const props = defineProps({
  products: Array
})

// Реактивная ссылка на объект Swiper
const swiper = ref(null)

// Хук, вызываемый после монтирования компонента
onMounted(() => {
  createSwiper()
})

// Слежение за изменением свойства products и пересоздание Swiper при изменении
watch(
  () => props.products,
  () => {
    destroySwiper()
    createSwiper()
  }
)

// Функция для создания экземпляра Swiper
const createSwiper = () => {
  swiper.value = new Swiper('.swiper-container', {
    loop: false,
    speed: 1000,
    slidesPerView: 4,
    spaceBetween: 24,
    direction: 'horizontal',

    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      1199: {
        slidesPerView: 3,
        spaceBetween: 24
      },
      1660: {
        slidesPerView: 4,
        spaceBetween: 24
      }
    }
  })
}

// Функция для уничтожения экземпляра Swiper
const destroySwiper = () => {
  if (swiper.value) {
    swiper.value.destroy()
    swiper.value = null
  }
}

// Получение экземпляра хранилища модального окна
const modalStore = useModalStore()
</script>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in products" :key="item.id">
        <ProductCard
          :product="item"
          :discount="discountValue"
          @click.stop="modalStore.showModal(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
