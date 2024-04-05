<template>
  <form @submit="handleSubmit">
    <FileUpload v-model="listing.productImage" />
    <input type="text" v-model.trim="listing.productName" placeholder="Nome e marca do produto" required />
    <select v-model="listing.quality" placeholder="Estado do produto" required>
      <option value="novo">Novo</option>
      <option value="semiNovo">Semi-novo</option>
      <option value="usadoBoaCondicao">Usado (Boa condição)</option>
      <option value="usadoMarcasUso">Usado (Marcas de uso)</option>
      <option value="usadoFaltaPartes">Usado (Faltam partes/peças)</option>
      <option value="usadoQuebrado">Usado (Quebrado)</option>
    </select>
    <PriceInput v-model="listing.value" />
    <input type="text" v-model.trim="listing.location" placeholder="Bairro onde o produto se encontra" required />
    <input type="text" v-model.trim="listing.sellerName" placeholder="Seu nome" required />
    <PhoneInput v-model="listing.sellerPhone" />
    <button type="submit">Enviar Anúncio</button>
  </form>
</template>
<script setup lang="ts">
import type { Listing, ProvidedListing } from '@/typings/Listing';

definePageMeta({
  headerText: 'Faça o envio do seu anúncio abaixo'
});

const router = useRouter();
const { listing, setListing } = inject('listing') as ProvidedListing;

const handleSubmit = (e: Event) => {
  e.preventDefault();
  localStorage.setItem(
    'listing',
    JSON.stringify({
      ...listing.value,
      value: listing.value.value.replaceAll(/\D/g, ''),
      sellerPhone: listing.value.sellerPhone.replaceAll(/\D/g, '')
    } as Listing)
  );
  setListing(listing.value);
  router.push('review');
};
</script>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;

  margin: 2rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  select {
    background-color: transparent;
    border: none;
    // color: #949494;
  }

  input,
  select {
    border: 2px solid #eaeaea;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.25em;
    width: 100%;
  }

  input::placeholder,
  select::placeholder {
    color: #949494;
    opacity: 1;
  }

  button {
    padding: 1rem 4rem;
    margin-top: 2rem;
    cursor: pointer;

    border: none;
    border-radius: 2rem;
    background-color: var(--color__main);
    color: white;

    font-family: 'Inter', sans-serif;
    font-weight: bold;
    font-size: 16px;

    box-shadow: 0 4px 4px hsla(0, 0%, 0%, 25%);
  }
}
</style>
