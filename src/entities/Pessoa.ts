import Contato from '../entities/Contato';

export default class Pessoa {
    contatos: Contato[] = []

    constructor(
        readonly id: string | null,
        readonly nome: string,
        readonly cpf: string,
        readonly dataDeNascimento: string
    ) {

    }
}