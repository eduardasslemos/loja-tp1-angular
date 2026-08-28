import { Component, computed, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from "../card-produto/card-produto";

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  apenasPromo = signal(false);

  produtosExibidos = computed(() => //computed pq ai vira uma lista imutavel q n muda
    this.apenasPromo() 
    ? this.produtos.filter(p => p.promo)
    : this.produtos
  );

  alternarPromo(){ //inverte p voltar a mostrar todos dnv
    this.apenasPromo.update(v => !v);
  }

  produtos = <Produto[]>[
    {
      id: 1,
      nome: 'Headphone Bluetooth P9 Air',
      preco: 169.99,
      descricao: "Conexão Bluetooth 5.0: Emparelhamento rápido e estável com todos os modelos de celular.",
      imagemUrl: 'images/headphone.png',
      promo: false,
      estado: 'novo'
    },
    {
      id: 2,
      nome: 'Power Bank Basike B-201 10.000mAh',
      preco: 144.83,
      descricao: "Tecnologia de Carregamento Ultra-Rápido PD 22.5W.",
      imagemUrl: 'images/powerbank.jpg',
      promo: true,
      estado: 'usado'
    },
    {
      id: 3,
      nome: 'Fones De Ouvido Bluetooth 5.3 Sem Fio Mtb-bl09 Tws',
      preco: 61.34,
      descricao: "Os fones de ouvido MTB-BL09 TWS.",
      imagemUrl: 'images/foneSemFio.jpg',
      promo: false,
      estado: 'esgotado'
    },
    {
      id: 4,
      nome: 'Garrafa',
      preco: 39.99,
      descricao: "Mucho boa.",
      imagemUrl: 'images/garrafa.jpg',
      promo: false,
      estado: 'novo'
    }
  ];

  onViewProduct(id: number){
    alert(`Visualizando produto id ${id}`);
  }

  onAddProduct(produto: {id: number, qtd: number}){
    alert(`Adicionando produto ${produto.id} | quantidade: ${produto.qtd}`);
  }
}
