import { Component, computed, inject, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from "../card-produto/card-produto";
import { ProdutoService } from '../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  private produtoService = inject(ProdutoService);

  public carregando = signal(true);

  private produtos = toSignal<Produto[], Produto[]>(this.produtoService.listar().pipe(finalize(() => this.carregando.set(false))),{initialValue: []});

  apenasPromo = signal(false);

  produtosExibidos = computed(() => //computed pq ai vira uma lista imutavel q n muda
    this.apenasPromo() 
    ? this.produtos().filter(p => p.promo)
    : this.produtos()
  );

  alternarPromo(){ //inverte p voltar a mostrar todos dnv
    this.apenasPromo.update(v => !v);
  }

  onViewProduct(id: number){
    alert(`Visualizando produto id ${id}`);
  }

  onAddProduct(produto: {id: number, qtd: number}){
    alert(`Adicionando produto ${produto.id} | quantidade: ${produto.qtd}`);
  }
}
