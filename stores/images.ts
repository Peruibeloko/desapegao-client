import { defineStore } from 'pinia';

export const useImages = defineStore('productImages', () => {
  const listingImage = ref('');
  const productPhoto = ref('');

  function clear() {
    listingImage.value = '';
    productPhoto.value = '';
  }

  return {
    listingImage,
    productPhoto,
    clear
  };
});
