import { Component, computed, inject, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from "../card-produto/card-produto";
import { ProdutoService } from '../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, Observable, of } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  private produtoService = inject(ProdutoService);

  public carregando = signal(true);

  public erroRede = signal(false); // novo sinal para controlar o estado de erro de rede

  categoriaSelecionada = signal<string>(''); // sinal q guardar a categoria ('' = todas)

  categorias = toSignal( // busca a lista de categorias vindas da API via Signal
    this.produtoService.getCategorias().pipe(
      catchError(() => of([] as string[])) // Se falhar categorias, mantém array vazio
    ) as Observable<string[]>,
    { initialValue: [] }
  );

  //private produtos = toSignal<Produto[], Produto[]>(this.produtoService.listar().pipe(finalize(() => this.carregando.set(false))),{initialValue: []});

  private produtos = toSignal( // busca a lista completa de produtos
    this.produtoService.listar().pipe(
      catchError(() => {
        this.erroRede.set(true); //cair a internet
        return of([] as Produto[]); 
      }),
      finalize(() => this.carregando.set(false))
    ) as Observable<Produto[]>,
    { initialValue: [] }
  );

  apenasPromo = signal(false);

  // produtosExibidos = computed(() => //computed pq ai vira uma lista imutavel q n muda
  //   this.apenasPromo() 
  //   ? this.produtos().filter(p => p.promo)
  //   : this.produtos()
  // );

  produtosExibidos = computed(() => {
    let resultado = this.produtos();

    const cat = this.categoriaSelecionada(); //filtra por categoria
    if (cat) {
      resultado = resultado.filter(p => p.categoria === cat);
    }

    if (this.apenasPromo()) { //filtra por promoção
      resultado = resultado.filter(p => p.promo);
    }

    return resultado;
  });

  onCategoriaChange(event: Event) { // método para atualizar o signal da categoria ao mudar o <select> no HTML
    const target = event.target as HTMLSelectElement;
    this.categoriaSelecionada.set(target.value);
  }

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
