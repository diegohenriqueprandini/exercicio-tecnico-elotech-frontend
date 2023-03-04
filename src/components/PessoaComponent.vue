<script setup lang="ts">
defineProps(
    ["pessoaList"]    
);
</script>

<template>
    <div v-if="pessoaList.items.length === 0">No items</div>
    <div v-for="pessoa in pessoaList.items">
        <span>{{ pessoa.id }} {{ pessoa.nome }} {{ pessoa.cpf }} {{ pessoa.dataDeNascimento }}</span>
        <button @click="pessoaList.removeItem(pessoa)">Remove</button>
    </div>
</template>

<style scoped>
</style>