import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Produto } from '../../../model/produto';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoForm {
  private produtoService = inject(ProdutoService);
  router = inject(Router);

  enviando = signal(false);
  mensagem = signal('');
  novaCategoria = signal('');

  private produtos = toSignal(this.produtoService.listar(), {initialValue: []});

  categorias = computed(() => {
    const lista = this.produtos().map(p => p.categoria).filter(Boolean); //pega todas as categorias de todos os produtos
    const unicas = Array.from(new Set(lista)); //pega a lista de categorias e retorna sem repetir, set = lista de valores nao repetidos, se tiver repetido ele elimina
    return [...unicas, 'Outra']; //retorna tudo oq tem no unicas + outra, tudo em uma lista so, spread operator
  });

  categoriaSelecionada = signal('');

  mostrarNovaCategoria = computed(() => this.categoriaSelecionada() == 'Outra');

  novoProduto: Produto = {
    id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    imagemUrl: '',
    categoria: '',
  }

  onSubmit(form: NgForm){
    if(form.invalid){
      this.mensagem.set("Preencha todos os campos");
      return;
    }

    this.novoProduto.categoria = this.categoriaSelecionada() == 'Outra'
      ? this.novaCategoria()
      : this.categoriaSelecionada();

    this.enviando.set(true);
    this.mensagem.set("Enviando produto...");

    this.produtoService.criar(this.novoProduto).pipe(
      finalize(() => this.enviando.set(false))
    ).subscribe(
      {
        next: (resp) => { //se der certo
          this.mensagem.set("Produto cadastrado com sucesso!");
          form.resetForm();
          setTimeout(() => this.router.navigateByUrl('/produtos'),1200);
        },
        error: (err) => { //se der erro
          this.mensagem.set("Erro ao criar produto: " + err);
        }
      }
    );
  }
}
