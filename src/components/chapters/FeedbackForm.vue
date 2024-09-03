<script setup>
// Импорт необходимых компонентов и функций из Vue и других библиотек
import { ref, reactive } from 'vue'
import AppButton from '@/components//elements/UI/Buttons/AppButton.vue'
import AppInput from '@/components/elements/UI/Inputs/AppInput.vue'
import SelectInput from '@/components/elements/UI/Inputs/SelectInput.vue'
import FileInput from '@/components/elements/UI/Inputs/FileInput.vue'
import AppRadio from '@/components/elements/UI/Inputs/AppRadio.vue'
import { maskPhoneNumberInput, formatDate } from '@/helpers/utils.js'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

// Функция для маскирования ввода телефонного номера
const maskPhoneInput = (event) => {
  maskPhoneNumberInput(event.target)
}

// Функция для получения массива дат на две недели вперед
const getDatesArray = () => {
  const datesArray = []

  const currentDate = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + i)
    datesArray.push(formatDate(date))
  }

  return datesArray
}

// Реактивный объект для хранения данных обратной связи
const feedBackData = reactive({
  name: '',
  phone: '',
  date: '',
  time: '',
  condition: '',
  files: []
})

// Ссылка на форму
const formRef = ref(null)

const resetFlag = ref(false)

// Функция для сброса формы
const resetForm = () => {
  feedBackData.name = ''
  feedBackData.phone = ''
  feedBackData.date = ''
  feedBackData.time = ''
  feedBackData.condition = ''
  feedBackData.files = []

  resetFlag.value = true

  formRef.value.reset()
}

// Данные для выбора времени
const timeSelectData = {
  placeholder: 'Выбрите время',
  items: ['с 10 до 12', 'с 12 до 14', 'с 14 до 16', 'с 16 до 18', 'с 18 до 20']
}

// Данные для выбора даты
const dateSelectData = {
  placeholder: 'Выбрите дату',
  items: getDatesArray()
}

// Данные для радио-кнопок
const radioData = [
  {
    name: 'condition',
    value: 'good',
    label: 'Хорошее состояние'
  },
  {
    name: 'condition',
    value: 'bad',
    label: 'Плохое состояние'
  }
]

// Обработчики формы
const formHandlers = {
  handlePhoneInput: (value) => {
    feedBackData.phone = value
  },
  handleNameInput: (value) => {
    feedBackData.name = value
  },
  handleDateSelect: (value) => {
    feedBackData.date = value
  },
  handleTimeSelect: (value) => {
    feedBackData.time = value
  },
  handleRadioClick: (value) => {
    feedBackData.condition = value
  },
  handleFileChange: (fileDataArray) => {
    feedBackData.files = fileDataArray
    resetFlag.value = false
  }
}

// Настройки для поля ввода имени
const nameInputSettings = reactive({
  placeholder: 'Имя',
  type: 'text'
})

// Настройки для поля ввода номера телефона
const phoneInputSettings = reactive({
  placeholder: 'номер телефона',
  type: 'tel',
  mask: { handler: maskPhoneInput }
})

// Переменная для принятия значений файлового ввода
const acceptValue = ref('image/*')

// Правила валидации формы
const validateRules = {
  name: {
    required: required,
    minLength: minLength(3)
  },
  phone: {
    required: required,
    minLength: minLength(18)
  },
  date: {
    required: required
  },
  time: {
    required: required
  },
  condition: {
    required: required
  },
  files: {
    required: required
  }
}

// Валидация формы с помощью Vuelidate
const v$ = useVuelidate(validateRules, feedBackData)

// Переменная для отслеживания состояния валидации
const isValid = ref(null)

// Функция для валидации формы
const validateForm = async () => {
  isValid.value = await v$.value.$validate()
  if (isValid.value) {
    // Отправка данных на сервер
    isValid.value = true
    resetForm()
  } else {
    return
  }
}
</script>

<template>
  <div class="feedback-form">
    <div class="feedback-form__inner">
      <form class="form" ref="formRef" @submit.prevent="validateForm">
        <div class="form__head">
          <div class="form__title">
            <span> покупаем Б/у сноуборды и зимнюю экипировку </span>
          </div>
          <div class="form__description">
            <span>
              Оставьте свои данные и приложите фото вещей, которые хотите продать и мы сами заберем
              ваши вещи в удобное для вас время.
            </span>
          </div>
        </div>
        <div class="form__body">
          <div class="form__inputs">
            <AppInput :settings="nameInputSettings" @input="formHandlers.handleNameInput" />
            <AppInput :settings="phoneInputSettings" @input="formHandlers.handlePhoneInput" />
            <SelectInput :select="dateSelectData" @input="formHandlers.handleDateSelect" />
            <SelectInput :select="timeSelectData" @input="formHandlers.handleTimeSelect" />
            <div class="form__radios">
              <AppRadio
                v-for="data in radioData"
                :data="data"
                @click="formHandlers.handleRadioClick(data.value)"
              />
            </div>
            <FileInput
              :accept="acceptValue"
              :files="feedBackData.files"
              :reset="resetFlag"
              @change="formHandlers.handleFileChange"
            />
          </div>
        </div>
        <AppButton :settings="{ text: 'Отправить', type: 'submit' }" />
        <div v-if="isValid !== null" class="form__message">
          <div class="form__status" v-if="isValid === false && isValid !== null">
            <span class="msg--error">Заполните корректно все поля</span>
          </div>
          <div class="form__status" v-else-if="isValid === true && isValid !== null">
            <span class="msg--success">Ваше сообщение успешно отправлено</span>
          </div>
        </div>
      </form>
      <img src="../../assets/images/feedback-form/form-bg.png" alt="skateboarder" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.feedback-form {
  background-color: $primary-300;
  border-radius: 16px;

  // .feedback-form__inner
  &__inner {
    padding: 65px 64px;
    display: grid;
    grid-template-columns: 53% auto;
    align-items: stretch;
    gap: 110px;

    @include media-large {
      padding: 40px;
      grid-template-columns: 70% auto;
    }

    @include media-medium {
      grid-template-columns: 1fr;
    }

    @include media-small {
      padding: 24px;
    }

    img {
      object-fit: contain;

      @include media-large {
        display: none;
      }
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @include media-small {
    gap: 24px;
  }

  // .form__head
  &__head {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  // .form__title
  &__title {
    @include Ms-upper48;
    color: $main;

    @include media-large {
      @include Ms-upper40;
    }

    @include media-medium {
      @include Ms-upper32;
    }

    @include media-small {
      @include Ms-upper24;
    }
  }

  // .form__description
  &__description {
    @include Ms-r20;
    color: $main;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }

  // .form__body
  &__body {
  }

  // .form__inputs
  &__inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @include media-extra-small {
      grid-template-columns: 1fr;
    }

    & > *:last-child {
      grid-column: span 2;

      @include media-extra-small {
        grid-column: span 1;
      }
    }
  }

  // .form__radios
  &__radios {
    grid-column: span 2;
    display: flex;
    align-items: center;
    gap: 24px;

    @include media-extra-small {
      grid-column: span 1;
    }
  }

  // .form__message
  &__message {
    .msg {
      @include Ms-r20;

      // .msg--error
      &--error {
        color: $red;
      }

      // .msg--success
      &--success {
        color: $green;
      }
    }
  }
}
</style>
