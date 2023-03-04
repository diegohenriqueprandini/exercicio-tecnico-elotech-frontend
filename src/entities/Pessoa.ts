export default class Pessoa {

    constructor(
        readonly id: string | null,
        readonly nome: string,
        readonly cpf: string,
        readonly dataDeNascimento: string
    ) {

    }
}