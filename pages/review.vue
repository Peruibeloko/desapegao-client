<template>
  <main>
    <Preview />
    <span v-if="sending">Enviando seu anúncio, aguarde{{ ellipsis }}</span>
    <button v-else type="button" @click="handleClick">Tudo certo!</button>
  </main>
</template>
<script setup lang="ts">
definePageMeta({
  headerText: 'Confira se o seu anúncio está correto'
});

const router = useRouter();
const sending = ref(false);

const handleClick = async () => {
  sending.value = true;

  const result = await fetch('https://desapegao.deno.dev/listing/ftp', {
    method: 'POST',
    body: localStorage.getItem('listing')
  })

  if (result.status !== 200) {
    sessionStorage.setItem('error', result.statusText)
    router.push('error');
    return true
  }

  router.push('finish');
  return true
}

const ellipsis = ref('.');
setInterval(() => {
  const currLen = ellipsis.value.length
  if (currLen === 3) {
    ellipsis.value = '.'
  } else {
    ellipsis.value = '.'.repeat(currLen + 1)
  }
}, 200);
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
