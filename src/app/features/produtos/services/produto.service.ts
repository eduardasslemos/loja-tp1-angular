import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Produto } from '../../../model/produto';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private logger = inject(LoggerService);

  private readonly listaMock = <Produto[]>[
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

  listar(): Observable<Produto[]>{
    this.logger.info("[PRODUTO SERVICE] - Retornando lista de produtos")
    return of(this.listaMock).pipe(
      delay(250)
    );
  }
}


