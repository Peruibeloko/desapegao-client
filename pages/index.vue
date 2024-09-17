<template>
  <div>
    <p class="paywall">Nós do time de desenvolvimento da plataforma suspendemos as operações do site até que a situação
      financeira do projeto seja normalizada.</p>
    <p class="paywall">Agradecemos a compreensão!</p>
  </div>
  <!-- <form @submit="handleSubmit">
    <FileUpload />
    <input type="text" v-model.trim="listing.productName" placeholder="Nome e marca do produto" required />
    <QualityPicker v-model="listing.quality" />
    <PriceInput />
    <input type="text" v-model.trim="listing.location" placeholder="Bairro onde o produto se encontra" required />
    <input type="text" v-model.trim="listing.sellerName" placeholder="Seu nome" required />
    <PhoneInput />
    <button class="footer-link" type="submit" :disabled="!listing.isFormValid">Enviar Anúncio</button>
  </form> -->
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
<style>
main {
  background-color: black;
}
</style>
<style scoped lang="scss">
div {
  font-family: serif;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.paywall {
  font-size: 2rem;
  text-align: center;
  max-width: 30rem;
}

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
    font-family: 'Inter';
    letter-spacing: -0.05rem;
    width: 100%;
  }

  input::placeholder {
    color: #949494;
    opacity: 1;
  }

  input:invalid::placeholder {
    color: hsl(0, 60%, 50%);
  }

  input:invalid {
    border-color: hsl(0, 60%, 50%);
    color: hsl(0, 60%, 50%);
    background-color: hsl(0, 100%, 85%);
  }

  button:disabled {
    background-color: hsl(0, 0%, 33%);
    cursor: not-allowed;
  }
}
</style>
