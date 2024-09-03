<script setup>
import { ref, computed, watchEffect } from 'vue'

const props = defineProps({
  endDate: {
    type: String,
    required: true
  }
})

// Реактивная переменная для хранения текущего времени
const currentTime = ref(new Date())

// Реактивная переменная для отслеживания завершения обратного отсчета
const countdownEnded = ref(false)

// Вычисляемое свойство для определения оставшегося времени до конечной даты
const timeRemaining = computed(() => {
  const endDate = new Date(props.endDate)
  const timeDifference = endDate - currentTime.value

  if (timeDifference <= 0) {
    countdownEnded.value = true
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  // Вычисление оставшегося времени в днях, часах, минутах и секундах
  const seconds = Math.floor((timeDifference / 1000) % 60)
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  // Возвращаем объект с оставшимся временем
  return {
    days,
    hours,
    minutes,
    seconds
  }
})

// Отслеживание изменений текущего времени с интервалом в 1 секунду
watchEffect(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  return () => clearInterval(timer)
})
</script>

<template>
  <div class="timer-block">
    <div class="timer-block__inner" v-if="!countdownEnded">
      <div class="timer-block__item">
        <span class="timer-block__value">{{ timeRemaining.days }}</span>
        <span class="timer-block__unit">дней</span>
      </div>
      <div class="timer-block__item">
        <span class="timer-block__value">{{ timeRemaining.hours }}</span>
        <span class="timer-block__unit">часов</span>
      </div>
      <div class="timer-block__item">
        <span class="timer-block__value">{{ timeRemaining.minutes }}</span>
        <span class="timer-block__unit">минут</span>
      </div>
      <div class="timer-block__item">
        <span class="timer-block__value">{{ timeRemaining.seconds }}</span>
        <span class="timer-block__unit">секунд</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timer-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  // .timer-block__inner
  &__inner {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @include media-extra-small {
      justify-content: center;
      gap: 18px;
    }
  }

  // .timer-block__item
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @include media-small {
      gap: 4px;
    }
  }

  // .timer-block__value
  &__value {
    @include Ms-upper48;
    color: $white;

    @include media-medium {
      @include Ms-upper40;
    }

    @include media-small {
      @include Ms-upper32;
    }

    @include media-extra-small {
      @include Ms-upper24;
    }
  }

  // .timer-block__unit
  &__unit {
    @include Ms-r20;
    color: $white;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }

    @include media-extra-small {
      @include Ms-r8;
    }
  }
}
</style>
