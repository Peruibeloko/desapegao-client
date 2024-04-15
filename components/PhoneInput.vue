<template>
  <input type="tel" placeholder="Telefone com DDD" required :value="internal" v-maska:[options] />
</template>
<script setup lang="ts">
import type { MaskInputOptions } from 'maska';
import { Mask } from 'maska';

const options: MaskInputOptions = {
  mask: '(##) #####-####',
  eager: true,
  onMaska({ unmasked }) {
    listing.sellerPhone = unmasked;
  }
};

const mask = new Mask(options);

const listing = useListing();
const internal = computed(() => mask.masked(listing.sellerPhone));
</script>
