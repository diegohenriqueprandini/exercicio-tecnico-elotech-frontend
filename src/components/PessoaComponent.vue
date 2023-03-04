<script setup lang="ts">
import { ref } from 'vue';
import Contato from '../entities/Contato';
import Pessoa from '../entities/Pessoa';
import PessoaList from '../entities/PessoaList';
defineProps(
    ["pessoaList"]    
);
const isNovoPessoa = ref(true);
const isNovoContato = ref(true);
const pessoaEdit = ref(new Pessoa(null, "", "", ""));
const contatoEdit = ref(new Contato(null, "", "", ""));

const arr: Contato[] = [];
const contatosEdit = ref(arr);

function cleanDataPessoa() {
    isNovoPessoa.value = true;
    pessoaEdit.value = new Pessoa(null, "", "", "");
}

function cleanDataContato() {
    isNovoContato.value = true;
    contatoEdit.value = new Contato(null, "", "", "");
}

function editarPessoa(pessoa: Pessoa) {
    isNovoPessoa.value = false;
    pessoaEdit.value = pessoa;
    contatosEdit.value = pessoa.contatos;
}

function editarContato(contato: Contato) {
    isNovoContato.value = false;
    contatoEdit.value = contato;
}

function salvarPessoa(pessoaList: PessoaList, pessoa: Pessoa, contatos: Contato[], novoPessoa: boolean) {
    if (novoPessoa) {
        if (contatos.length < 1) return;
        pessoaList.criarPessoa(pessoa, contatos);        
    } else {
        pessoaList.alterarPessoa(pessoa);
    }
    cleanDataPessoa();
}

function adicionarContato(pessoaList: PessoaList, pessoa: Pessoa, contato: Contato, novoPessoa: boolean, novoContato: boolean) {
    if (novoPessoa) {
        contatosEdit.value.push(contato);
    } else {
        if (novoContato) {
            pessoaList.adicionarContato(pessoa, contato);
        } else {
            pessoaList.alterarContato(pessoa, contato); 
        }
    }
    cleanDataContato();
}

function removerContato(pessoaList: PessoaList, pessoa: Pessoa, contato: Contato) {
    if (isNovoPessoa) {
        contatosEdit.value.splice(contatosEdit.value.indexOf(contato), 1);
    } else {
        pessoaList.removerContato(pessoa, contato);
    }
    cleanDataContato();
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
            <td><button @click="editarPessoa(pessoa)">Editar</button></td>
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
    <button @click="salvarPessoa(pessoaList, pessoaEdit, contatosEdit, isNovoPessoa)">{{ isNovoPessoa ? 'Adicionar Pessoa' : 'Salvar Pessoa' }}</button>  
    <br><br>
    <hr>
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
    <br>
    <button @click="adicionarContato(pessoaList, pessoaEdit, contatoEdit, isNovoPessoa, isNovoContato)">{{ isNovoContato ? 'Adicionar Contato' : 'Salvar Contato' }}</button>
    <br><br>

    <table>
        <tr>
            <td>Nome</td>
            <td>Telefone</td>
            <td>E-mail</td>
            <td></td>
        </tr>
        <tr v-for="contato in contatosEdit">
            <td>{{ contato.nome }}</td>
            <td>{{ contato.telefone }}</td>
            <td>{{ contato.email }}</td>
            <td><button @click="removerContato(pessoaList, pessoaEdit, contatoEdit)">Remover</button></td>
            <td><button @click="editarContato(contato)">Editar</button></td>
        </tr>
    </table>
</template>

<style scoped>
</style>