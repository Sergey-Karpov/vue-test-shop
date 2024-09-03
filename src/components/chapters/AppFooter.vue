<script setup></script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__inner">
        <div class="footer__rights">
          <span>2019-2023 © TestShop. Вcе права защищены.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: $main;

  // .footer__inner
  &__inner {
    padding: 27px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @include media-small {
      padding: 23px 0;
    }
  }

  &__rights {
    @include Ms-r20;
    color: $white;

    @include media-medium {
      @include Ms-r18;
    }

    @include media-small {
      @include Ms-r14;
    }
  }
}
</style>
