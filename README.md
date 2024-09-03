# test-shop

This template should help get you started developing with Vue 3 in Vite.

test-shop - это простое веб-приложение, разработанное с использованием Vue 3 и Vite, вот некоторые ключевые особенности этого приложения:

Функциональность
Просмотр списка продуктов с возможностью фильтрации по категориям, наличию и цене.
Просмотр информации о каждом продукте, включая его изображение, описание и цену.
Добавление продуктов в корзину и управление содержимым корзины.
Поддержка промоакций с расчетом скидок и отображением актуальной информации о промоакциях.
Возможность пользователю пройти небольшую регистрацию и отображение статуса в header сайта.
Заполнение и отправка формы обратной связи для выкупа иныентаря

Особенности
Простой и интуитивно понятный интерфейс для удобного взаимодействия.
Оптимизированная производительность благодаря использованию Vite и компонентного подхода Vue 3.
Чистый и модульный код для удобного понимания и дальнейшего развития проекта.
Расширяемая архитектура, позволяющая легко добавлять новые функции и компоненты.

Использование
Установите зависимости с помощью команды npm install.
Запустите локальный сервер разработки с помощью команды npm run dev.
Откройте веб-браузер и перейдите по адресу http://localhost:3000 для доступа к приложению.

Детали
assets - дерриктория с default нвстройками стилей проекта, включающая в себя шрифты, сброс стилей, переменные, mixins, изображения и тд.
components - хранилище компоннентов проекта
chapters - сборные компоненты, споссобные включать в себя другие компоненты
elements - самодостаточные компоненты - без возможностти декомпазиции, buttons, links, inputs ets
entities - сборные сущности состоящие из других компонентов - elements
icons - компоненты иконок проекта
data - моковые данные проекта - отправная точка отрисовки страницы - список продуктов - при необходимости может загружаться с backend
helpers - хранилище вспомогательных переиспользуемых функция в проекте
router - хранилище основного route проекта
stores - дериктория хранилищь проекта
cart - хранилище корзины
modal - хранилище состояния перииспользуемого модального окна проекта
products - хранилище списка продуктов
promo - хранилище текущщего промо
user - хранилице login состояния
views - включает дерикторию sections и компоненты самих страниц

Дополнительные комментарии

- в проекте используется один компонент периспользуемого модального окна для различного контента
- более 95% контента на страницах реализованно с помощью переииспользуемых компонентов с динамически пробрасываемыми данными
- сотсояние компонентов header динамически отраджает состояние приложения - login, cart value
- в секции hero - так же отображаются динамические данные о main promo, promo - реализован таймер обратного отчета от текущей даты до конца действия дpromo, название promo так же динамические данные полученые из соответствуещего store
- 3 категории - так же динамически полученные категории товаров, - являються ссылками перебрасывающими user на страницы каталога с сооответсвующими категории товарами
- в секции каталог динамически отрисованы карточки товара с использованием products store, есть возможность фильтрации списка по категории, диапазону цены, доступности
- слайдер списка товаров динамически отрисовывается в зависимости от настроек фильтров
- при клике на карточку товара всплывает компонент модального окна с данными о продукте и возможностью выбора цвета и размра для добавления в корзину => состояния корзины обновляються динапически
- форма запроса ОС для выкупа инвентаря - используються только переиспользуемые компоненты Inputs, selecrs, radio ets
- при клике отправить все поля формы проходят валидацию на value, в зависимости от статуса валидации приходит сообщение о статусе отпрвки
- дополнительно реализованы страницы каталога, корзины со списком товаров и калькуляцией заказа

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
