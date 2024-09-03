<script setup>
import { ref, reactive } from 'vue'
import AppButton from '@/components/elements/UI/Buttons/AppButton.vue'
import { maskPhoneNumberInput } from '@/helpers/utils.js'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useUserStore } from '@/stores/user.'

const userStore = useUserStore()

console.log(userStore.userData)

const emits = defineEmits(['login'])

// Функция для применения маски к номеру телефона
const maskPhoneNumber = () => {
  maskPhoneNumberInput(event.target)
}

// Реактивная переменная для хранения состояния формы (1 - ввод номера телефона, 2 - ввод кода из SMS)
const formState = ref(1)

// Реактивный объект для хранения данных формы
const state = reactive({
  phoneNumber: '',
  code: ''
})

// Правила валидации формы
const rules = {
  phoneNumber: {
    required: helpers.withMessage('fill the field', required),
    minLength: minLength(18)
  },
  code: {
    required: helpers.withMessage('fill the field with code', required)
  }
}

// Валидация формы с использованием Vuelidate
const v$ = useVuelidate(rules, state)

// Функция для валидации и обработки отправки формы
const validateForm = async () => {
  switch (formState.value) {
    case 1:
      const firstValidateResult = await v$.value.phoneNumber.$validate()
      if (firstValidateResult) {
        formState.value = 2
        startTimer()
      }
      break
    case 2:
      const secondValidateResult = await v$.value.code.$validate()
      if (secondValidateResult) {
        emits('login')
        userStore.addUserData({
          phoneNumber: state.phoneNumber
        })
        setTimeout(() => {
          state.phoneNumber = ''
          formState.value = 1
        }, 100)
      } else {
        // Обработка ошибок валидации
      }
      break
  }
}

// Реактивная переменная для хранения значения таймера обратного отсчета
const timerValue = ref(60)

// Функция для запуска таймера обратного отсчета
let timer
const startTimer = () => {
  timer = setInterval(() => {
    timerValue.value -= 1
    if (timerValue.value === 0) {
      clearInterval(timer)
      formState.value = 1
    }
  }, 1000)
}

const logoutHandler = () => {
  emits('login')
  userStore.logout()
}
</script>

<template>
  <div class="login">
    <div v-if="userStore.userData !== null" class="login__out">
      <div class="login__title">
        <span>Выйти</span>
      </div>
      <div class="login__user-phone">
        <span>Пользователь: {{ userStore.userData.phoneNumber }}</span>
      </div>
      <AppButton @click="logoutHandler" :settings="{ text: 'Выйти', type: 'button' }" />
    </div>
    <div v-else class="login__inner">
      <div class="login__title">
        <span>Вход и регистрация</span>
      </div>
      <form class="login__form" @submit.prevent="validateForm">
        <div v-if="formState === 1" class="login__state">
          <div :class="{ 'login__input-block': true, error: v$.phoneNumber.$errors.length }">
            <input
              type="tel"
              class="login__input"
              placeholder="Номер телефона"
              v-model="state.phoneNumber"
              @focus="maskPhoneNumber"
              @input="maskPhoneNumber"
            />
            <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <AppButton :settings="{ text: 'Отправить код', type: 'submit' }" />
        </div>
        <div v-else class="login__state">
          <div :class="{ 'login__input-block': true, error: v$.phoneNumber.$errors.length }">
            <input
              type="number"
              class="login__input"
              placeholder="Код из SMS"
              v-model="state.code"
            />
            <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <span class="login__resend-code">
            Отправить код снова через {{ timerValue }} секунд
          </span>
          <AppButton
            class="login__code-submit"
            :disabled="!state.code ? true : false"
            :settings="{ text: 'Подтвердить', type: 'submit' }"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  min-height: 100%;

  // .login__out
  &__out {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  // .login__inner
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }

  // .login__title
  &__title {
    @include Ms-upper24;
    color: $main;

    @include media-small {
      @include Ms-upper16;
    }
  }

  // .login__form
  &__form {
    width: 100%;
  }

  // .login__state
  &__state {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: stretch;

    @include media-small {
      gap: 16px;
    }
  }

  // .login__input-block
  &__input-block {
    width: 100%;
    position: relative;
  }

  // .login__input
  &__input {
    padding: 15px 16px;
    width: 100%;
    height: 56px;
    @include Ms-r20;
    color: $main;
    outline: none;
    border: none;
    background-color: $white;
    border-radius: 8px;
    border: 1px solid transparent;
    @include defaultTransition;

    @include hover {
      border-color: $primary-100;
    }

    &:focus {
      border-color: $base-100;
    }

    @include media-medium {
      height: 48px;
      @include Ms-r18;
    }

    @include media-small {
      height: 40px;
      @include Ms-r14;
    }
  }

  // .login__code-submit
  &__code-submit {
    &:disabled {
      opacity: 0.4;
      pointer-events: none;
      @include defaultTransition;
    }
  }

  // .login__resend-code
  &__resend-code {
    @include Ms-r20;
    color: $main;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }
}

.error-msg {
  position: absolute;
  top: calc(100% + 8px);
  left: 12px;
  font-size: 14px;
  color: $red;
}
</style>
