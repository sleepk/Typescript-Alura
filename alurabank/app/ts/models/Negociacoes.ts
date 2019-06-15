class Negociacoes {
    private _negociacoes: Negociacao[] = [];


    // adiciona um item ao array negociacoes. 
    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }

    // pega os dados do array
    paraArray() {
        return this._negociacoes;
    }

}