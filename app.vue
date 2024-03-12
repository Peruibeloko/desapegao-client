<template>
  <header>
    <img src="./assets/images/Logo.png" alt="Logo do site" />
    <span>
      {{ route.meta.headerText ?? '' }}
    </span>
  </header>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import '../assets/styles/theme.scss';

const route = useRoute();
</script>

<style lang="scss">
header {
  display: flex;
  flex-direction: column;
}

header > img {
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
