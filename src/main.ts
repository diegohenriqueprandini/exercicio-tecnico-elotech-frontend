import { createApp } from 'vue'
import App from './App.vue'
import PessoaHttpGateway from './gateways/PessoaHttpGateway'
import AxiosHttpClient from './infra/AxiosHttpClient'

const app = createApp(App)
const httpClient = new AxiosHttpClient()
const pessoaGateway = new PessoaHttpGateway(httpClient, "http://localhost:8080");
app.provide("pessoaGateway", pessoaGateway)
app.mount('#app')
