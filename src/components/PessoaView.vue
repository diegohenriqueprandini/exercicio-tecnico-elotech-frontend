<script setup lang="ts">
import { ref, reactive, onMounted, computed, inject } from 'vue';
import PessoaGateway from '../gateways/PessoaGateway';
import PessoaList from '../entities/PessoaList';
import Pessoa from '../entities/Pessoa';
import PessoaComponent from './PessoaComponent.vue';

const pessoaGateway = inject("pessoaGateway") as PessoaGateway;

const data: any = reactive({ pessoaList: new PessoaList() });

async function carregar() {
    const pessoas = await pessoaGateway.listar();
    data.pessoaList.items = pessoas;
}

onMounted(async () => {
    await carregar();

    data.pessoaList.register("criarPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.criar(pessoa);
        await carregar();
    });

    data.pessoaList.register("alterarPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.alterar(pessoa);
    });

    data.pessoaList.register("removerPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.remover(pessoa);
    });    
});

</script>

<template>
    <PessoaComponent :pessoa-list="data.pessoaList"></PessoaComponent>
</template>

<style scoped>
</style>