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

    async alterarPessoa(pessoa: Pessoa) {
        const found = this.items.find((item) => item.id == pessoa.id);
        if (found == null) return;
        this.items.splice(this.items.indexOf(found), 1, pessoa);
        super.notify("alterarPessoa", pessoa);        
    }

    async removerPessoa(pessoa: Pessoa) {
        const found = this.items.find((item) => item.id == pessoa.id);
        if (found == null) return;
        this.items.splice(this.items.indexOf(found), 1);
        super.notify("removerPessoa", pessoa);
    }

    async adicionarContato(pessoa: Pessoa, contato: Contato) {
        pessoa.contatos.push(contato);
        super.notify("adicionarContato", { pessoa, contato });
    }

    async alterarContato(pessoa: Pessoa, contato: Contato) {
        const found = pessoa.contatos.find((item) => item.id == contato.id);
        if (found == null) return;
        pessoa.contatos.splice(pessoa.contatos.indexOf(found), 1, contato);
        super.notify("alterarContato", { pessoa, contato });
    }

    async removerContato(pessoa: Pessoa, contato: Contato) {
        const found = pessoa.contatos.find((item) => item.id == contato.id);
        if (found == null) return;
        pessoa.contatos.splice(pessoa.contatos.indexOf(found), 1);
        super.notify("removerContato", { pessoa, contato });
    }
}