<template>
  <main>
    <p>Seu anúncio foi enviado com sucesso!</p>
    <!-- <p>Aguarde 24h para enviar seu próximo anúncio</p> -->
    <NuxtLink to="/">Voltar ao início</NuxtLink>
  </main>
</template>
<script setup lang="ts">
definePageMeta({
  headerText: 'Obrigado!'
})
</script>
<style scoped lang="scss">
main {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: fit-content;

  background-color: color-mix(in srgb, #FFF 100%, var(--color__secondary) 50%);
  padding: 2rem;
  border-radius: 1rem;
}

p {
  font-family: 'Inter';
  text-align: center;
  font-weight: bold;
}

a {
  padding: 1rem 4rem;
  text-decoration: none;
  cursor: pointer;

  border: none;
  border-radius: 2rem;
  background-color: var(--color__main);
  color: white;

  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 16px;

  box-shadow: 0 4px 4px hsla(0, 0%, 0%, 25%);
}
</style>