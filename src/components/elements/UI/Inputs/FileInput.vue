<script setup>
import { reactive, defineEmits, watch } from 'vue'
import CloseButton from '../Buttons/CloseButton.vue'

const props = defineProps({
  accept: String,
  reset: Boolean
})

// Реактивный объект для хранения текущих данных о выбранных файлах
const currentFileData = reactive({
  selectedFileName: '',
  selectedFilesArray: []
})

const emits = defineEmits(['change'])

// Обработчик изменения выбранных файлов
const handleFileChange = (event) => {
  const files = event.target.files

  if (files.length > 0) {
    for (const file of files) {
      const fileData = {
        fileName: file.name,
        file: file
      }
      currentFileData.selectedFilesArray.push(fileData)
    }
  }

  emits('change', currentFileData)
}

// Обработчик удаления выбранного файла
const removeItem = (item) => {
  const index = currentFileData.selectedFilesArray.indexOf(item)
  if (index !== -1) {
    currentFileData.selectedFilesArray.splice(index, 1)
  }
}

const resetFileList = () => {
  currentFileData.selectedFilesArray = []
}

watch(
  () => props.reset,
  (newValue) => {
    if (newValue) {
      resetFileList()
    }
  }
)
</script>

<template>
  <div class="file-input-wrapper">
    <div class="file-input">
      <label class="file-input__label">
        <input
          ref="fileInput"
          :accept="accept"
          @change.stop="handleFileChange"
          autocomplete="off"
          type="file"
          class="file-input__field--hidden"
        />
        <input
          autocomplete="off"
          type="text"
          class="file-input__field"
          placeholder="Приложить файл"
          :value="currentFileData.selectedFileName"
          readonly
        />
      </label>
    </div>
    <div class="files-list" v-if="currentFileData.selectedFilesArray.length > 0">
      <div v-for="file in currentFileData.selectedFilesArray" class="file">
        <span>{{ file.fileName }}</span>
        <CloseButton @click="removeItem(file)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}
.file-input {
  width: 100%;
  position: relative;

  // .file-input__field
  &__field {
    padding: 15px 16px;
    max-width: 100%;
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

    @include media-medium {
      height: 48px;
      @include Ms-r18;
    }

    @include media-small {
      padding: 11px 16px;
      height: 40px;
      @include Ms-r14;
    }

    &::placeholder {
      @include Ms-r20;

      @include media-medium {
        @include Ms-r18;
      }

      @include media-small {
        @include Ms-r14;
      }
    }

    // .file-input__field--hidden
    &--hidden {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
  }
}

.files-list {
  display: flex;
  align-items: center;
  gap: 16px;
}

.file {
  display: flex;
  align-items: center;
  gap: 8px;

  span {
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
</style>
