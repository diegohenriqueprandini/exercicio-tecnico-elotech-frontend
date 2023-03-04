import Contato from "../entities/Contato"
import Pessoa from "../entities/Pessoa"

export default interface PessoaGateway {
    listar(): Promise<Pessoa[]>
    criar(pessoa: Pessoa): Promise<Pessoa>
    alterar(pessoa: Pessoa): Promise<Pessoa>
    remover(pessoa: Pessoa): Promise<void>
    adicionarContato(pessoa: Pessoa, contato: Contato): Promise<void>
    alterarContato(pessoa: Pessoa, contato: Contato): Promise<void>
    removerContato(pessoa: Pessoa, contato: Contato): Promise<void>
}