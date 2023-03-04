<script setup lang="ts">
import { ref } from 'vue';
defineProps(
    ["pessoaList"]    
);
const nome = ref("");
const cpf = ref("");
const dataDeNascimento = ref("");

function cleanData() {
    nome.value = "";
    cpf.value = "";
    dataDeNascimento.value = "";
}

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

    <div>
        <label>Nome</label>
        <input type="text" v-model="nome" />
    </div>    
    <div>
        <label>Cpf</label>
        <input type="text" v-model="cpf" />
    </div>    
    <div>
        <label>Data de Nascimento</label>
        <input type="text" v-model="dataDeNascimento" />
    </div>    
    <button @click="() => { pessoaList.adicionarPessoa(nome, cpf, dataDeNascimento); cleanData(); }">Adicionar</button>    
</template>

<style scoped>
</style>