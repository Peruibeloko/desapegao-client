<template>
  <input
    type="tel"
    placeholder="Valor em reais"
    v-model="model"
    v-maska="model"
    data-maska="R$ 9,00"
    data-maska-tokens="9:\d:multiple"
    required
  />
</template>
<script setup lang="ts">
const model = defineModel();
</script>
