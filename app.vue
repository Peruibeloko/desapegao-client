<template>

  <Head>
    <title>Desapegão</title>
    <link rel="shortcut icon" :href="favicon" type="image/x-icon">
  </Head>
  <header>
    <NuxtLink to="/">
      <img src="./assets/images/Logo.png" alt="Logo do site" />
    </NuxtLink>
    <span> {{ route.meta.headerText ?? '' }} </span>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>
<script setup lang="ts">
///@ts-expect-error
import favicon from './assets/images/favicon.ico'
import '../assets/styles/theme.scss';
import type { Listing } from './typings/Listing';

onMounted(() => {
  const persistedData = localStorage.getItem('listing');

  if (!persistedData) return;

  listing.value = JSON.parse(persistedData);
});

const route = useRoute();
const listing = ref<Listing>({
  productImage: '',
  productName: '',
  quality: 'novo',
  value: 0,
  location: '',
  sellerName: '',
  sellerPhone: ''
})

const updateListing = (k: keyof Listing, v: Listing[typeof k]) => {
  listing.value = {
    ...listing.value,
    [k]: v
  }
}

const setListing = (v: Listing) => listing.value = v

provide('listing', {
  listing,
  updateListing,
  setListing
})
</script>
<style lang="scss">
header {
  display: flex;
  flex-direction: column;
}

header>a>img {
  width: 80px;
  padding: 1rem;
}

header>span {
  padding: 0.75rem 0;

  background-color: var(--color__main);
  color: white;

  text-align: center;
  font-size: 19pt;
  font-family: 'Inter';
  font-weight: bold;
}
</style>
