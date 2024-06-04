<template>
  <select v-model="model" placeholder="Estado do produto" required>
    <option value="novo">Novo</option>
    <option value="semiNovo">Semi-novo</option>
    <option value="usadoBoaCondicao">Usado (Boa condição)</option>
    <option value="usadoMarcasUso">Usado (Marcas de uso)</option>
    <option value="usadoFaltaPartes">Usado (Faltam partes/peças)</option>
    <option value="usadoQuebrado">Usado (Quebrado)</option>
  </select>
</template>

<script setup lang="ts">
import type { Listing } from '~/typings/Listing';

const model = defineModel<Listing['quality']>({
  default: 'novo'
});
</script>

<style scoped lang="scss">
select {
  background-color: transparent;
  border: none;

  border: 2px solid #eaeaea;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.25em;
  font-family: 'Inter';
  letter-spacing: -0.05rem;
  width: 100%;

  &::placeholder {
    color: #949494;
    opacity: 1;
  }
}
</style>
