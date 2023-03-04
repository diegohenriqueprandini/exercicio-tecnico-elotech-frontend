<script setup lang="ts">
import { ref, reactive, onMounted, computed, inject } from 'vue';
import PessoaGateway from '../gateways/PessoaGateway';
import PessoaList from '../entities/PessoaList';
import PessoaComponent from './PessoaComponent.vue';

const pessoaGateway = inject("pessoaGateway") as PessoaGateway;

const data: any = reactive({ pessoaList: new PessoaList([]) });

onMounted(async () => {
    const pessoas = await pessoaGateway.listar();
    data.pessoaList = new PessoaList(pessoas);
    console.log(data.pessoaList.items.length)
});


</script>

<template>
    <PessoaComponent :pessoa-list="data.pessoaList"></PessoaComponent>
</template>

<style scoped>
</style>