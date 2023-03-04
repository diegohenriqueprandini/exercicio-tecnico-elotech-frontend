import Pessoa from '../entities/Pessoa';

export default class PessoaList {

    constructor(
        readonly items: Pessoa[]
    ) {

    }
}