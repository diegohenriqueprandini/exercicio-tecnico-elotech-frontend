<script setup lang="ts">
import { ref } from 'vue';
import Contato from '../entities/Contato';
import Pessoa from '../entities/Pessoa';
defineProps(
    ["pessoaList"]    
);
const pessoaEdit = ref(new Pessoa(null, "", "", ""));
const contatoEdit = ref(new Contato(null, "", "", ""));

function cleanDataPessoa() {
    pessoaEdit.value = new Pessoa(null, "", "", "");
}

function cleanDataContato() {
    contatoEdit.value = new Contato(null, "", "", "");
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

    <br>
    <div>
        <label>Nome</label>
        <input type="text" v-model="pessoaEdit.nome" />
    </div>    
    <div>
        <label>Cpf</label>
        <input type="text" v-model="pessoaEdit.cpf" />
    </div>    
    <div>
        <label>Data de Nascimento</label>
        <input type="text" v-model="pessoaEdit.dataDeNascimento" />
    </div>    

    <br>
    <label>Contatos</label>
    <div>
        <label>Nome</label>
        <input type="text" v-model="contatoEdit.nome" />
    </div>    
    <div>
        <label>Telefone</label>
        <input type="text" v-model="contatoEdit.telefone" />
    </div>    
    <div>
        <label>E-mail</label>
        <input type="text" v-model="contatoEdit.email" />
    </div>    
    <button @click="() => { pessoaList.adicionarContato(pessoaEdit, contatoEdit); cleanDataContato(); }">Adicionar Contato</button>  
    
    <br><br>
    
    <table>
        <tr>
            <td>Nome</td>
            <td>Telefone</td>
            <td>E-mail</td>
            <td></td>
        </tr>
        <tr v-for="contato in pessoaEdit.contatos">
            <td>{{ contato.nome }}</td>
            <td>{{ contato.telefone }}</td>
            <td>{{ contato.email }}</td>
            <td><button @click="pessoaList.removerContato(pessoaEdit, contatoEdit)">Remover</button></td>
        </tr>
    </table>

    <br><br>
    <button @click="() => { pessoaList.adicionarPessoa(pessoaEdit); cleanDataPessoa(); }">Salvar Pessoa</button>  
</template>

<style scoped>
</style>