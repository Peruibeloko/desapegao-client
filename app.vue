<template>
  <header>
    <NuxtLink to="/">
      <img src="~/assets/images/Logo.png" alt="Logo do site" />
    </NuxtLink>
    <span> {{ route.meta.headerText ?? '' }} </span>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>
<script setup lang="ts">
import '../assets/styles/theme.scss';
import { useListing } from './stores/listing';

const route = useRoute();
const listing = useListing();

onMounted(() => {
  const persistedData = localStorage.getItem('listing');

  if (!persistedData) return;

  listing.init(JSON.parse(persistedData));
});
</script>
<style lang="scss">
header {
  display: flex;
  flex-direction: column;
}

header > a > img {
  width: 80px;
  padding: 1rem;
}

header > span {
  padding: 0.75rem 0;

  background-color: var(--color__main);
  color: white;

  text-align: center;
  font-size: 19pt;
  font-family: 'Inter';
  font-weight: bold;
}
</style>
