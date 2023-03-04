import Pessoa from '../entities/Pessoa';
import Observable from './Observable';

export default class PessoaList extends Observable {

    constructor(
        readonly items: Pessoa[]
    ) {
        super();
    }

    async removerPessoa(pessoa: Pessoa) {
        this.items.splice(this.items.indexOf(pessoa), 1);
        super.notify("removerPessoa", pessoa);
    }
}