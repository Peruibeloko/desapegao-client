<template>
  <main>
    <Preview />
    <button type="button">Tudo certo!</button>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  headerText: 'Confira se o seu anúncio está correto'
});
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 2rem;
}

button {
  padding: 1rem 4rem;
  
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
