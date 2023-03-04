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
        await carregar();
    });

    data.pessoaList.register("alterarPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.alterar(pessoa);
        await carregar();
    });

    data.pessoaList.register("removerPessoa", async (pessoa: Pessoa) => {
        await pessoaGateway.remover(pessoa);
        await carregar();
    });
    
    data.pessoaList.register("adicionarContato", async (adicionarContato: any) => {
        const pessoa = adicionarContato.pessoa;
        const contato = adicionarContato.contato;
        await pessoaGateway.adicionarContato(pessoa, contato);
        await carregar();
    });
    
    data.pessoaList.register("alterarContato", async (alterarContato: any) => {
        const pessoa = alterarContato.pessoa;
        const contato = alterarContato.contato;
        await pessoaGateway.alterarContato(pessoa, contato);
        await carregar();
    });

    data.pessoaList.register("removerContato", async (removerContato: any) => {
        const pessoa = removerContato.pessoa;
        const contato = removerContato.contato;
        await pessoaGateway.removerContato(pessoa, contato);
        await carregar();
    }); 
});

</script>

<template>
    <PessoaComponent :pessoa-list="data.pessoaList"></PessoaComponent>
</template>

<style scoped>
</style>