<template>
  <input
    inputmode="tel"
    type="text"
    placeholder="Telefone com DDD"
    pattern="\(\d{2}\) \d{5}-\d{4}"
    :value="internal"
    v-maska:[options]
    required
  />
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

<style scoped lang="scss">
input:invalid {
  border-color: hsl(0, 60%, 50%);
  color: hsl(0, 60%, 50%);
  background-color: hsl(0, 100%, 85%);
}
</style>
