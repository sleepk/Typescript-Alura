import { Negociacao } from "./Negociacao";

export class Negociacoes {
    private _negociacoes: Negociacao[] = [];


    // adiciona um item ao array negociacoes. 
    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }

    // pega os dados do array
    paraArray(): Negociacao[] {
        return ([]as Negociacao[]).concat(this._negociacoes);
    }

}