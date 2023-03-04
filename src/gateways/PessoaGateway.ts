import Pessoa from "../entities/Pessoa"

export default interface PessoaGateway {
    listar(): Promise<Pessoa[]>
    criar(pessoa: Pessoa): Promise<Pessoa>
    alterar(pessoa: Pessoa): Promise<Pessoa>
    remove(pessoa: Pessoa): Promise<void>
}