import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toggleBodyOffset, resetBodyOffset } from '@/helpers/utils.js'

// Определение хранилища модального окна
export const useModalStore = defineStore('modal', () => {
  const modalIsActive = ref(false)

  // Реактивная ссылка на текущий идентификатор отображаемого элемента
  const currentIdForDisplay = ref(null)

  // Функция изменения состояния модального окна
  const changeModalState = () => {
    modalIsActive.value = !modalIsActive.value
  }

  // Функция отображения модального окна с переданным идентификатором элемента
  const showModal = (itemId) => {
    currentIdForDisplay.value = itemId || null
    changeModalState()
    toggleBodyOffset()
  }

  // Функция закрытия модального окна
  const closeModal = () => {
    changeModalState()
    resetBodyOffset()
  }

  // Обработчик клика за пределами модального окна для его закрытия
  const handleClickOutside = (event) => {
    if (modalIsActive.value && !event.target.closest('.modal-window')) {
      closeModal()
    }
  }

  // Возвращаемые значения и функции хранилища модального окна
  return {
    modalIsActive,
    currentIdForDisplay,
    showModal,
    closeModal,
    handleClickOutside
  }
})
