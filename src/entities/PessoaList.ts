import Pessoa from '../entities/Pessoa';
import Contato from './Contato';
import Observable from './Observable';

export default class PessoaList extends Observable {

    items: Pessoa[] = []

    async adicionarPessoa(pessoa: Pessoa) {
        this.items.push(pessoa)
        super.notify("criarPessoa", pessoa);        
    }

    async removerPessoa(pessoa: Pessoa) {
        const found = this.items.find((item) => item.id == pessoa.id);
        if (found == null) return;
        this.items.splice(this.items.indexOf(found), 1);
        super.notify("removerPessoa", pessoa);
    }

    async adicionarContato(pessoa: Pessoa, contato: Contato) {
        pessoa.contatos.push(contato);
    }

    async removerContato(pessoa: Pessoa, contato: Contato) {
        pessoa.contatos.splice(pessoa.contatos.indexOf(contato), 1);
    }
}