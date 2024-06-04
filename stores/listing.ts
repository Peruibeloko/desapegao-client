import { defineStore } from 'pinia';
import type { Listing } from '~/typings/Listing';

export const useListing = defineStore('listing', () => {
  const productName = ref('');
  const quality = ref<Listing['quality']>('novo');
  const value = ref('');
  const location = ref('');
  const sellerName = ref('');
  const sellerPhone = ref('');

  const isFormValid = computed(
    () =>
      productName.value !== '' &&
      value.value !== '' &&
      location.value !== '' &&
      sellerName.value !== '' &&
      sellerPhone.value !== '' &&
      sellerPhone.value.length === 11 &&
      useImages().productPhoto !== ''
  );

  function init(data: Listing) {
    productName.value = data.productName;
    quality.value = data.quality;
    value.value = data.value;
    location.value = data.location;
    sellerName.value = data.sellerName;
    sellerPhone.value = data.sellerPhone;
  }

  function reset() {
    productName.value = '';
    quality.value = 'novo';
    value.value = '';
    location.value = '';
    sellerName.value = '';
    sellerPhone.value = '';
  }

  function asObject() {
    return {
      productName: productName.value,
      quality: quality.value,
      value: value.value,
      location: location.value,
      sellerName: sellerName.value,
      sellerPhone: sellerPhone.value
    };
  }

  function asJson() {
    return JSON.stringify(asObject());
  }

  return {
    productName,
    quality,
    value,
    location,
    sellerName,
    sellerPhone,
    isFormValid,
    init,
    reset,
    asObject,
    asJson
  };
});
