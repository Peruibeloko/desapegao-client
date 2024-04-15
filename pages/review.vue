<template>
  <main>
    <Preview />
    <span v-if="sending">Enviando seu anúncio, aguarde{{ ellipsis }}</span>
    <button v-else type="button" @click="handleClick" :disabled="!image">{{!image ? `Carregando prévia${ellipsis}` : "Tudo certo!"}}</button>
  </main>
</template>
<script setup lang="ts">
import type { Listing } from '~/typings/Listing';

definePageMeta({
  headerText: 'Confira se o seu anúncio está correto',
  middleware: (to, _) => {
    if (to.path !== 'review') {
      return;
    }

    if (!images.productPhoto) {
      return navigateTo('/');
    }
  }
});

const router = useRouter();
const sending = ref(false);

const listing = useListing();
const images = useImages();

const handleClick = async () => {
  sending.value = true;

  const result = await fetch('https://desapegao.deno.dev/listing/ftp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...listing.asObject(),
      listingImage: images.listingImage
    })
  });

  if (result.status !== 200) {
    sessionStorage.setItem('error', await result.text());
    return router.push('error');
  }

  localStorage.removeItem('listing');
  listing.reset();
  images.clear();
  router.push('finish');
};

const ellipsis = ref('.');
setInterval(() => {
  const currLen = ellipsis.value.length;
  ellipsis.value = currLen === 3 ? '.' : '.'.repeat(currLen + 1);
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

button,
span {
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

button:disabled {
  background-color: hsl(0, 0%, 33%);
  cursor: not-allowed;
}
</style>
