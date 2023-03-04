export default class Contato {
    constructor(
        readonly id: string | null,
        readonly nome: string,
        readonly telefone: string,
        readonly email: string
    ) {

    }
}