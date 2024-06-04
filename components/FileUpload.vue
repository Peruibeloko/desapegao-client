<template>
  <input
    type="file"
    name="productPhoto"
    id="productPhoto"
    accept="image/png, image/jpeg"
    @change="handleInput"
    required
  />
  <label for="productPhoto">
    <div v-if="fileSize !== 0">
      <img ref="preview" :src="images.productPhoto" />
      <span>{{ dimensions.x }}x{{ dimensions.y }}, {{ formattedSize }}</span>
    </div>
    <div v-else>
      <i class="material-symbols-outlined">&#xF09B;</i>
      <span>Clique aqui para enviar sua imagem</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import Compressor from 'compressorjs';

const images = useImages();
const preview = ref<HTMLImageElement>();
const fileSize = ref(0);

const formatFileSize = (fileSize: number) => {
  if (fileSize >= 1_000_000) return `${(fileSize / 1_000_000).toFixed(2)}MB`;
  if (fileSize >= 1_000) return `${(fileSize / 1_000).toFixed(2)}KB`;
  return `${fileSize}B`;
};

const formattedSize = computed(() => formatFileSize(fileSize.value));

const dimensions = computed(() => {
  if (!preview.value) return { x: 0, y: 0 };
  return { x: preview.value.naturalWidth, y: preview.value.naturalHeight };
});

const setImage = (img: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => {
    const result = reader.result as string;
    images.productPhoto = result;

    const blob = new Blob([result], { type: 'image/png' });
  });
};

const handleInput = (e: Event) => {
  const selectedFile = (e.target as HTMLInputElement).files?.item(0);

  if (!selectedFile) {
    fileSize.value = 0;
    return;
  }

  fileSize.value = selectedFile.size;

  new Compressor(selectedFile, {
    quality: 0.6,
    strict: true,
    convertSize: -Infinity,
    success: setImage
  });
};
</script>

<style scoped lang="scss">
input {
  display: none;
}

input:invalid + label div {
  border-color: hsl(0, 60%, 50%);
  color: hsl(0, 60%, 50%);
  background-color: hsl(0, 100%, 85%);
}

label {
  width: 70%;
}

label > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 1rem;
  gap: 1rem;

  border: 2px black dotted;
  border-radius: 1rem;

  color: #949494;
  text-align: center;
  font-family: 'Inter';

  cursor: pointer;

  i {
    color: black;
    font-size: 7rem;
  }

  img {
    width: 200px;
  }

  span {
    font-family: 'Inter';
    letter-spacing: -0.05rem;
  }
}
</style>
