export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  categoria?: string;
  imagem_url?: string;
  estoque: number;
  created_at: string;
}

export interface ProdutoForm {
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem_url: string;
  estoque: number;
}
