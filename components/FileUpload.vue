<template>
  <input
    type="file"
    name="productImage"
    id="productImage"
    accept="image/png, image/jpeg"
    @change="handleInput"
    required
  />
  <label for="productImage">
    <div v-if="fileInfo.name">
      <img :src="fileInfo.imageData" />
      <span>{{ fileInfo.width }}x{{ fileInfo.height }}, {{ formattedSize }}</span>
    </div>
    <div v-else>
      <i class="material-symbols-outlined">&#xF09B;</i>
      <span>Clique aqui para enviar sua imagem</span>
    </div>
  </label>
</template>

<script setup lang="ts">
const fileInfo = ref({
  name: '',
  size: 0,
  imageData: '',
  width: 0,
  height: 0
});

const formattedSize = computed(() => {
  const fileSize = fileInfo.value.size;
  switch (true) {
    case fileSize >= 1_000_000:
      return `${(fileSize / 1_000_000).toFixed(2)}MB`;

    case fileSize >= 1_000:
      return `${(fileSize / 1_000).toFixed(2)}KB`;

    default:
      return `${fileSize}B`;
  }
});

const handleInput = async (e: Event) => {
  const selectedFile = (e.target as HTMLInputElement).files?.item(0);

  if (!selectedFile) {
    fileInfo.value = {
      name: '',
      size: 0,
      imageData: '',
      width: 0,
      height: 0
    };

    return;
  }

  const img = new Image();
  img.src = URL.createObjectURL(selectedFile);

  fileInfo.value = {
    name: selectedFile.name,
    size: selectedFile.size,
    imageData: URL.createObjectURL(selectedFile),
    width: img.width,
    height: img.height
  };
};
</script>

<style scoped lang="scss">
input {
  display: none;
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
}
</style>
