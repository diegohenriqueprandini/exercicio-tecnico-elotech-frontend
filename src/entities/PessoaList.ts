import Pessoa from '../entities/Pessoa';
import Contato from './Contato';
import Observable from './Observable';

export default class PessoaList extends Observable {

    items: Pessoa[] = []

    async criarPessoa(pessoa: Pessoa, contatos: Contato[]) {
        pessoa.contatos = contatos
        this.items.push(pessoa)
        super.notify("criarPessoa", pessoa);        
    }

    async removerPessoa(pessoa: Pessoa) {
        const found = this.items.find((item) => item.id == pessoa.id);
        if (found == null) return;
        this.items.splice(this.items.indexOf(found), 1);
        super.notify("removerPessoa", pessoa);
    }
}