<script setup lang="ts">
import { ref, reactive, onMounted, computed, inject } from 'vue';
import PessoaGateway from '../gateways/PessoaGateway';
import PessoaList from '../entities/PessoaList';
import Pessoa from '../entities/Pessoa';
import PessoaComponent from './PessoaComponent.vue';

const pessoaGateway = inject("pessoaGateway") as PessoaGateway;

const data: any = reactive({ pessoaList: new PessoaList([]) });

onMounted(async () => {
    const pessoas = await pessoaGateway.listar();
    data.pessoaList = new PessoaList(pessoas);

    data.pessoaList.register("criarPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.criar(pessoa);
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