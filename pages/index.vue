<template>
  <form @submit="handleSubmit" :ref="form">
    <FileUpload />
    <input type="text" name="productName" placeholder="Nome e marca do produto" required />
    <select name="quality" placeholder="Estado do produto" required>
      <option value="novo">Novo</option>
      <option value="semiNovo">Semi-novo</option>
      <option value="usadoBoaCondicao">Usado (Boa condição)</option>
      <option value="usadoMarcasUso">Usado (Marcas de uso)</option>
      <option value="usadoFaltaPartes">Usado (Faltam partes/peças)</option>
      <option value="usadoQuebrado">Usado (Quebrado)</option>
    </select>
    <input type="number" name="value" placeholder="Valor" required />
    <input type="text" name="location" placeholder="Bairro onde o produto se encontra" required />
    <input type="text" name="sellerName" placeholder="Seu nome" required />
    <input type="tel" name="sellerPhone" placeholder="Telefone" required />
    <button type="submit">Enviar Anúncio</button>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  headerText: 'Faça o envio do seu anúncio abaixo'
});

const router = useRouter();

const form = ref();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement).values();

  let collected = [];
  for (const item of data) {
    collected.push(item);
  }

  console.log(collected);
  router.push('review');
  // const data = await fetch('https://desapegao.deno.dev/listing').then(res => res.json());
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
    color: #949494;
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
}
</style>
