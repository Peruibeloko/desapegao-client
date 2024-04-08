<template>
  <input type="tel" placeholder="Valor em reais" :value="internal" v-maska:[options] required />
</template>
<script setup lang="ts">
import type { MaskInputOptions } from 'maska';
import { Mask } from 'maska';

const options: MaskInputOptions = {
  mask: 'R$ A',
  eager: true,
  tokens: {
    A: {
      pattern: /\d/,
      multiple: true
    }
  },
  onMaska({ unmasked }) {
    listing.value = unmasked;
  }
};

const mask = new Mask(options);

const listing = useListing();
const internal = computed(() => mask.masked(listing.value));
</script>
