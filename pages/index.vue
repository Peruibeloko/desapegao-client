<template>
  <h1>desapega desapega olx</h1>
  <h2>{{ data }}</h2>
</template>

<script setup lang="ts">
const data = await fetch('https://desapegao.deno.dev/listing').then(res => res.json())
console.log(data)
</script>