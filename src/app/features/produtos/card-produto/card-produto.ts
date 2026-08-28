import { Component, input, output, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { QuantidadeControle } from "../../../shared/quantidade-controle/quantidade-controle";
import { CurrencyPipe } from '@angular/common';
import { DescontoPipe } from "../../../shared/pipes/desconto-pipe";

@Component({
  selector: 'app-card-produto',
  imports: [QuantidadeControle, CurrencyPipe, DescontoPipe],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  produto = input.required<Produto>();
  quantidade = signal<number>(1);

  add = output<{id: number, qtd: number}>(); //ao usuario clicar no botao add vamos enviar o id do produto e a quantidade
  view = output<number>(); //retornar o id, onde o usuario ve os detalhes do produto e aparece o id

  onAdd(){ //emitindo id e quantidade do produto
    this.add.emit({id: this.produto().id, qtd: this.quantidade()}); //para acessar o valor de um signal devemos trata-lo como funcao()
  }

  onView(){ //emitindo o id
    this.view.emit(this.produto().id);
  }
}
