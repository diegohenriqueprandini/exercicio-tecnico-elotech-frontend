import Contato from "../entities/Contato";
import Pessoa from "../entities/Pessoa";
import HttpClient from "../infra/HttpClient";
import PessoaGateway from "./PessoaGateway";

export default class PessoaHttpGateway implements PessoaGateway {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}
    
    async listar(): Promise<Pessoa[]> {
        const response = await this.httpClient.get(`${this.baseUrl}/pessoas`)
        const pessoas = response.pessoas.map((item: any) => {
            return new Pessoa(
                item.id,
                item.nome,
                item.cpf,
                item.dataDeNascimento
            )
        });
        pessoas.forEach(async (item: any) => {
            const contatos = await this.buscarContatosPessoa(item)
            item.contatos = contatos;
        });
        return pessoas;
    }
    
    async criar(pessoa: Pessoa): Promise<Pessoa> {
        const response = await this.httpClient.post(`${this.baseUrl}/pessoas`, pessoa)
        const pessoaNova = new Pessoa(
            response.id,
            response.nome,
            response.cpf,
            response.dataDeNascimento
        );
        const responseContatos = await this.httpClient.get(`${this.baseUrl}/pessoas/${pessoaNova.id}/contatos`)
        const contatos = await this.buscarContatosPessoa(pessoaNova);
        pessoaNova.contatos = contatos;
        return pessoaNova;
    }
    
    async alterar(pessoa: Pessoa): Promise<Pessoa> {
        const response = await this.httpClient.put(`${this.baseUrl}/pessoas/${pessoa.id}`, pessoa)
        const pessoaAlterada =  new Pessoa(
            response.id,
            response.nome,
            response.cpf,
            response.dataDeNascimento
        );
        const contatos = await this.buscarContatosPessoa(pessoaAlterada);
        pessoaAlterada.contatos = contatos;
        return pessoaAlterada;
    }
    
    async remover(pessoa: Pessoa): Promise<void> {
        await this.httpClient.delete(`${this.baseUrl}/pessoas/${pessoa.id}`)
    }

    async buscarContatosPessoa(pessoa: Pessoa): Promise<Contato[]> {
        const responseContatos = await this.httpClient.get(`${this.baseUrl}/pessoas/${pessoa.id}/contatos`)
        const contatos = responseContatos.contatos.map((item: any) => {
            return new Pessoa(
                item.id,
                item.nome,
                item.telefone,
                item.email
            )
        });
        return contatos;
    }
}