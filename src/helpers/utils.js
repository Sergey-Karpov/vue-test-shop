// Функция для сброса смещения тела страницы
export const resetBodyOffset = () => {
  const body = document.body
  const fixedElements = document.querySelectorAll('.fixed')

  // Сброс смещения и скроллинга тела страницы
  body.style.paddingRight = ''
  fixedElements.forEach((el) => (el.style.paddingRight = ''))
  body.style.overflow = 'auto'
}

// Функция для переключения смещения тела страницы
export const toggleBodyOffset = () => {
  const body = document.body
  const fixedElements = document.querySelectorAll('.fixed')
  const scrollWidth = window.innerWidth - body.offsetWidth

  // Если смещение уже установлено, сбрасываем его
  if (body.style.paddingRight) {
    body.style.paddingRight = ''
    fixedElements.forEach((el) => (el.style.paddingRight = ''))
    body.style.overflow = 'auto'
  } else {
    // Иначе устанавливаем смещение и блокируем скроллинг тела страницы
    body.style.paddingRight = `${scrollWidth}px`
    fixedElements.forEach((el) => (el.style.paddingRight = `${scrollWidth}px`))
    body.style.overflow = 'hidden'
  }
}

// Функция для форматирования цены
export const formatePrice = (price) => {
  if (price !== undefined) {
    // Форматирование цены с разделением на тысячи
    let priceFormatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return priceFormatted
  }
  return ''
}

// Функция для вычисления текущей цены с учетом скидки
export const getCurrentPrice = (currentPrice, discount) => {
  return Math.ceil(currentPrice * (discount / 100))
}

// Функция для форматирования даты
export const formatDate = (date) => {
  // Получение дня, месяца и года из объекта Date и форматирование в строку "дд.мм.гггг"
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Функция для маскирования ввода номера телефона в инпуте
export const maskPhoneNumberInput = (input) => {
  let keyCode
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode)
    // Получение позиции курсора в инпуте
    let pos = this.selectionStart
    if (pos < 3) event.preventDefault()
    // Шаблон маски номера телефона
    let matrix = '+7 (___) ___ __ __',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, ''),
      // Формирование нового значения инпута с учетом маски
      new_value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
      })
    i = new_value.indexOf('_')
    if (i != -1) {
      i < 5 && (i = 3)
      new_value = new_value.slice(0, i)
    }
    // Формирование регулярного выражения для валидации значения инпута
    let reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return '\\d{1,' + a.length + '}'
      })
      .replace(/[+()]/g, '\\$&')
    reg = new RegExp('^' + reg + '$')
    // Проверка значения инпута на соответствие маске и корректность длины номера
    if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58))
      this.value = new_value
    if (event.type == 'blur' && this.value.length < 5) this.value = ''
  }

  // Обработчики событий для применения маски при вводе, фокусировке, потере фокуса и нажатии клавиш
  input.addEventListener('input', mask, false)
  input.addEventListener('focus', mask, false)
  input.addEventListener('blur', mask, false)
  input.addEventListener('keydown', mask, false)
}
