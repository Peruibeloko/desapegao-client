<template>
  <div ref="p5Canvas"></div>
</template>
<script setup lang="ts">
import sketchFactory from '@/scripts/sketch';
import P5 from 'p5';
import { useListing } from '~/stores/listing';
import { useImages } from '~/stores/images';

const p5Canvas = ref<HTMLElement>();
const p5instance = ref<P5>();

const listing = useListing();
const images = useImages();

const getListing = () => listing.asObject();
const getImage = () => images.productPhoto;
const setImage = (imgData: string) => (images.listingImage = imgData);

const sketch = sketchFactory(getListing, getImage, setImage);

onMounted(() => {
  p5instance.value = new P5(sketch, p5Canvas.value);
});

onUnmounted(() => {
  p5instance.value?.remove();
});
</script>
<style scoped lang="scss">
div {
  max-width: 90%;
  margin: 0 auto;

  :deep(canvas) {
    width: auto !important;
    height: auto !important;
    max-width: 100%;
  }
}
</style>
