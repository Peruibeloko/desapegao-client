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
    <div v-if="fileSize !== 0">
      <img ref="image" :src="model" />
      <span>{{ image?.naturalWidth ?? 0 }}x{{ image?.naturalHeight ?? 0 }}, {{ formattedSize }}</span>
    </div>
    <div v-else>
      <i class="material-symbols-outlined">&#xF09B;</i>
      <span>Clique aqui para enviar sua imagem</span>
    </div>
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string>();
const image = ref<HTMLImageElement>();
const fileSize = ref(0);

const formattedSize = computed(() => {
  switch (true) {
    case fileSize.value >= 1_000_000:
      return `${(fileSize.value / 1_000_000).toFixed(2)}MB`;

    case fileSize.value >= 1_000:
      return `${(fileSize.value / 1_000).toFixed(2)}KB`;

    default:
      return `${fileSize.value}B`;
  }
});

const handleInput = (e: Event) => {
  const selectedFile = (e.target as HTMLInputElement).files?.item(0);

  if (!selectedFile) {
    fileSize.value = 0
    return;
  }

  fileSize.value = selectedFile.size;

  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.addEventListener('load', () => {
    model.value = reader.result as string;
  });
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
