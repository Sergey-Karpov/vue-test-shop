import { defineStore } from 'pinia'

export const usePromoStore = defineStore('promo', () => {
  // Инициализация основной акционной информации
  const mainPromo = {
    large: '../../src/assets/images/banner/banner-large.png',
    pc: '../../src/assets/images/banner/banner-pc.png',
    tablet: '../../src/assets/images/banner/banner-tablet.png',
    mobile: '../../src/assets/images/banner/banner-mobile.png',
    min: '../../src/assets/images/banner/banner-min.png',
    default: '../../src/assets/images/banner/banner.png'
  }

  // Инициализация текущей активной акции
  const currentPromo = {
    name: 'Большая распродажа',
    title: 'скидки до 50%',
    discount: 50,
    endDate: '2024-06-01T00:00:00'
  }

  // Возвращаемые значения хранилища акций
  return {
    mainPromo,
    currentPromo
  }
})
