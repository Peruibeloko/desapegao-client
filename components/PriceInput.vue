<template>
  <input
    inputmode="numeric"
    type="text"
    placeholder="Valor em reais"
    :value="internal"
    v-maska:[options]
    pattern="R\$ [1-9]\d*"
    required
  />
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

<style scoped lang="scss">
input:invalid {
  border-color: hsl(0, 60%, 50%);
  color: hsl(0, 60%, 50%);
  background-color: hsl(0, 100%, 85%);
}
</style>
