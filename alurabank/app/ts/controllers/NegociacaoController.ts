import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacao, Negociacoes, NegociacaoParcial } from "../models/index";
import { logarTempoExecucao } from '../helpers/decorators/logarTempoExecucao'
import { domInject } from '../helpers/decorators/domInject'
//declaracao de classe
export class NegociacaoController {
  @domInject('#data')
  private _inputData: JQuery;
  @domInject('#quantidade')
  private _inputQuantidade: JQuery;
  @domInject('#valor')
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView', true);
  private _mensagemView = new MensagemView('#mensagemView', true);

  /**
   * <HTMLInputElement> faz um casting de variavel nos itens. 
   */
  constructor() {

  }

  /* metodo que adicioa um item
  * abaixo é colocado os tipos de cada item do typescript, facilitando o uso dos itens.
  */
  @logarTempoExecucao()
  adiciona(event: Event): void {

    event.preventDefault();

    let data = new Date(this._inputData.val().replace(/-/g, ','));

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update("Somente negociações em dias uteis por favor");
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');
  }

  private _ehDiaUtil(data: Date): boolean {
    return data.getDay() != DiaDaSemana.Sabado || data.getDay() != DiaDaSemana.Domingo;
  }


  // funcao para importar os dados da tabela
  impotaDados() {
    function isOk(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error('res.statusText')
      }
    }
    fetch('http://localhost:8080/dados')
      .then(res => isOk(res))
      .then(res => res.json())
      .then((dados: NegociacaoParcial[]) => {
        dados
          .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
          .forEach(negociacao => this._negociacoes.adiciona(negociacao));
          this._negociacoesView.update(this._negociacoes);
      })
      .catch(err => console.log(err));
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}