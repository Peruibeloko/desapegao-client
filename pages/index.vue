<template>
  <form @submit="handleSubmit">
    <FileUpload />
    <input type="text" v-model.trim="listing.productName" placeholder="Nome e marca do produto" required />
    <QualityPicker v-model="listing.quality" />
    <PriceInput />
    <input type="text" v-model.trim="listing.location" placeholder="Bairro onde o produto se encontra" required />
    <input type="text" v-model.trim="listing.sellerName" placeholder="Seu nome" required />
    <PhoneInput />
    <button class="footer-link" type="submit">Enviar Anúncio</button>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  headerText: 'Faça o envio do seu anúncio abaixo'
});

const router = useRouter();
const listing = useListing();

const handleSubmit = (e: Event) => {
  e.preventDefault();

  localStorage.setItem('listing', listing.asJson());
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

  input {
    border: 2px solid #eaeaea;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.25em;
    width: 100%;
  }

  input::placeholder {
    color: #949494;
    opacity: 1;
  }
}
</style>
