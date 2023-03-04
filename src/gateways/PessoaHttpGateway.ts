import Pessoa from "../entities/Pessoa";
import HttpClient from "../infra/HttpClient";
import PessoaGateway from "./PessoaGateway";

export default class PessoaHttpGateway implements PessoaGateway {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}
    
    async listar(): Promise<Pessoa[]> {
        const response = await this.httpClient.get(`${this.baseUrl}/pessoas`)
        const pessoas = response.pessoas;
        return pessoas.map((item: any) => {
            return new Pessoa(
                item.id,
                item.nome,
                item.cpf,
                item.dataDeNascimento
            )
        });
    }
    
    async criar(pessoa: Pessoa): Promise<Pessoa> {
        const response = await this.httpClient.post(`${this.baseUrl}/pessoas`, pessoa)
        return new Pessoa(
            response.id,
            response.nome,
            response.cpf,
            response.dataDeNascimento
        );
    }
    
    async alterar(pessoa: Pessoa): Promise<Pessoa> {
        const response = await this.httpClient.put(`${this.baseUrl}/pessoas/${pessoa.id}`, pessoa)
        return new Pessoa(
            response.id,
            response.nome,
            response.cpf,
            response.dataDeNascimento
        );
    }
    
    async remover(pessoa: Pessoa): Promise<void> {
        await this.httpClient.delete(`${this.baseUrl}/pessoas/${pessoa.id}`)
    }
}