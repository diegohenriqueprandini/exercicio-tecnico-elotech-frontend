import Pessoa from '../entities/Pessoa';
import Observable from './Observable';

export default class PessoaList extends Observable {

    constructor(
        readonly items: Pessoa[]
    ) {
        super();
    }

    async adicionarPessoa(nome: string, cpf: string, dataDeNascimento: string) {
        const pessoa = new Pessoa(
            null,
            nome,
            cpf,
            dataDeNascimento
        );
        this.items.push(pessoa)
        super.notify("criarPessoa", pessoa);
    }

    async removerPessoa(pessoa: Pessoa) {
        this.items.splice(this.items.indexOf(pessoa), 1);
        super.notify("removerPessoa", pessoa);
    }
}