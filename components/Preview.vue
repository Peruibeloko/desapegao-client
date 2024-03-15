<template>
  <div ref="p5Canvas"></div>
</template>
<script setup lang="ts">
import P5 from 'p5';
import sketchFactory from '@/scripts/sketch';
import ListingSchema from '@/typings/Listing';
import type { z } from 'zod';

const p5Canvas = ref<HTMLElement>();
const p5instance = ref<P5>();
const sketch = sketchFactory(() => productData, '/_nuxt/assets/fonts/Inter-Bold.ttf');

const listingData = localStorage.getItem('listing');

const router = useRouter();

if (!listingData) router.push('/');

const productData = JSON.parse(listingData as string) as z.infer<typeof ListingSchema>;

onMounted(() => {
  p5instance.value = new P5(sketch, p5Canvas.value);
});

onUnmounted(() => {
  p5instance.value?.remove();
});
</script>
