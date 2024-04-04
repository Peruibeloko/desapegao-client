<template>
  <div ref="p5Canvas"></div>
</template>
<script setup lang="ts">
import P5 from 'p5';
import sketchFactory from '@/scripts/sketch';
import ListingSchema from '@/typings/Listing';
import type { z } from 'zod';

definePageMeta({
  middleware: (to, from) => {
    if (to.path !== 'review') {
      return;
    }

    const listingData = localStorage.getItem('listing');

    if (!listingData) {
      return navigateTo('/');
    }

    const productData = JSON.parse(listingData as string) as z.infer<typeof ListingSchema>;

    if (!productData.productImage) {
      return navigateTo('/');
    }
  }
});

interface Props {
  setImage: (img: string) => void
}

const { setImage } = defineProps<Props>()

const p5Canvas = ref<HTMLElement>();
const p5instance = ref<P5>();

const listingData = localStorage.getItem('listing');
const productData = JSON.parse(listingData as string) as z.infer<typeof ListingSchema>;
const sketch = sketchFactory(() => productData, setImage);

onMounted(() => {
  p5instance.value = new P5(sketch, p5Canvas.value);
});

onUnmounted(() => {
  p5instance.value?.remove();
});
</script>
