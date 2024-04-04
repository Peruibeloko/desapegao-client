<template>
  <main>
    <span>Sua listagem não foi registrada. Por favor, envie um print dessa tela para o administrador:</span>
    <code>
      {{ error }}
    </code>
  </main>
</template>
<script setup lang="ts">
definePageMeta({
  headerText: 'Ocorreu um erro'
});

const error = ref('Illegal access at foobar')
onMounted(() => {
  error.value = sessionStorage.getItem('error') ?? error.value
})
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: fit-content;
}

span {
  font-family: 'Inter';
  text-align: center;
}

code {
  margin-top: 2rem;
  background-color: color-mix(in srgb, #FFF 100%, var(--color__main) 20%);
  padding: 2rem;
  border-radius: 1rem;
}
</style>