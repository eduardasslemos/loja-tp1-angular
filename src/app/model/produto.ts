export interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    imagemUrl?: string;
    promo?: boolean;
}
