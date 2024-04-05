<template>
  <input
    type="tel"
    placeholder="Telefone com DDD"
    required
    v-model="model"
    v-maska="model"
    data-maska="(##) #####-####"
    data-maska-eager
  />
</template>
<script setup lang="ts">
const model = defineModel();
</script>
