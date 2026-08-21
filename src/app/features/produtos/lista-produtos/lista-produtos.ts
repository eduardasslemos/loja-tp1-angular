import { Component } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from "../card-produto/card-produto";

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = <Produto[]>[
    {
      id: 1,
      nome: 'Headphone Bluetooth P9 Air',
      preco: 169.99,
      descricao: "Conexão Bluetooth 5.0: Emparelhamento rápido e estável com todos os modelos de celular. Cancelamento de Ruído: Tecnologia que reduz sons externos, ideal para quem busca imersão total. Qualidade de Som Superior: Drivers dinâmicos oferecem graves profundos e agudos cristalinos, proporcionando uma experiência sonora envolvente. Design Ergonômico: Conforto garantido para uso prolongado, com ajuste seguro e estável.",
      imagemUrl: 'images/headphone.png',
      promo: false
    },
    {
      id: 2,
      nome: 'Power Bank Basike B-201 10.000mAh',
      preco: 144.83,
      descricao: "Tecnologia de Carregamento Ultra-Rápido PD 22.5W: Com uma impressionante potência de 22.5W, o carregador portátil Basike recarrega rapidamente a bateria do seu dispositivo, reduzindo significativamente o tempo de carregamento. Utilize o cabo integrado para carregar seu iPhone 16 Pro em até 57% ou S24 Ultra em até 63% em 30 minutos, perfeito para viagens e viagens de negócios.",
      imagemUrl: 'images/powerbank.jpg',
      promo: true
    },
    {
      id: 3,
      nome: 'Fones De Ouvido Bluetooth 5.3 Sem Fio Mtb-bl09 Tws',
      preco: 61.34,
      descricao: "Os fones de ouvido MTB-BL09 TWS unem design moderno, qualidade sonora excepcional e funcionalidade intuitiva, sendo o acessório ideal para quem busca praticidade e alto desempenho no dia a dia. Com tecnologia avançada e um visual sofisticado, eles oferecem uma experiência auditiva imersiva.",
      imagemUrl: 'images/foneSemFio.jpg',
      promo: false
    }
  ];

  onViewProduct(id: number){
    alert(`Visualizando produto id ${id}`);
  }

  onAddProduct(produto: {id: number, qtd: number}){
    alert(`Adicionando produto ${produto.id} | quantidade: ${produto.qtd}`);
  }
}
