<script setup lang="ts">
defineProps(
    ["pessoaList"]    
);
</script>

<template>    
    <table>
        <tr>
            <td>Nome</td>
            <td>Cpf</td>
            <td>Data de Nascimento</td>
            <td></td>
        </tr>
        <tr v-for="pessoa in pessoaList.items">
            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.cpf }}</td>
            <td>{{ pessoa.dataDeNascimento }}</td>
            <td><button @click="pessoaList.removerPessoa(pessoa)">Remover</button></td>
        </tr>
    </table>
    <div v-if="pessoaList.items.length === 0">No items</div>
    
</template>

<style scoped>
</style>