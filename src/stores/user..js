import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // Создание ссылки на объект с данными пользователя
  const userData = ref(null)

  // Функция для добавления данных пользователя
  const addUserData = (data) => {
    userData.value = {
      phoneNumber: data.phoneNumber
    }
  }

  // Функция для удаления данных пользователя
  const logout = () => {
    userData.value = null
  }

  // Возвращаемые значения хранилища пользовательских данных
  return {
    userData,
    addUserData,
    logout
  }
})
