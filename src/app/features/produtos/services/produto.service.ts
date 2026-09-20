import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Produto, ProdutoMapper } from '../../../model/produto';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';

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

  getCategorias(): Observable<string[]> {
    this.logger.info('[PRODUTO SERVICE] - Buscando lista de categorias');
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
      catchError(erro => {
        this.logger.error('[PRODUTO SERVICE] - Erro ao buscar categorias');
        return of([]);
      })
    );
  }

  // listar(): Observable<Produto[]>{
  //   this.logger.info("[PRODUTO SERVICE] - Retornando lista de produtos")
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(lista => lista.map(prod => ProdutoMapper.fromJson(prod))),
  //     catchError(erro => {
  //       this.logger.error("[PRODUTO SERVICE] - Retornando lista de produtos");
  //       return of([]);
  //     })
  //   )
  // }

  listar(categoria?: string): Observable<Produto[]> {
    this.logger.info(`[PRODUTO SERVICE] - Retornando lista de produtos ${categoria ? 'para categoria: ' + categoria : 'todas'}`);

    const url = categoria 
      ? `${this.apiUrl}/category/${categoria}` 
      : this.apiUrl;

    return this.http.get<any[]>(url).pipe(
      map(lista => lista.map(prod => ProdutoMapper.fromJson(prod))),
      catchError(erro => {
        this.logger.error('[PRODUTO SERVICE] - Erro na requisição HTTP');
        return throwError(() => erro);
      })
    );
  }

  // getById(id: number): Observable<Produto | undefined>{
  //   return of(this.listaMock.find(p => p.id == id)).pipe(delay(500));
  // }

  getById(id: number): Observable<Produto | undefined> {
    this.logger.info(`[PRODUTO SERVICE] - Buscando produto com id ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(prod => {
     
        if (!prod || Object.keys(prod).length === 0) {
          return undefined;
        }
       
        return ProdutoMapper.fromJson(prod);
      }),
      catchError(erro => {
        this.logger.error(`[PRODUTO SERVICE] - Erro ao buscar produto com id ${id}`);
      
        return of(undefined);
      })
    );
  }
}


