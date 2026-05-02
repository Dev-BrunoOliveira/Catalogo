import axios from "axios";
import type { Produto, ProdutoForm } from "../types/produto";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getProdutos = async (): Promise<Produto[]> => {
  const { data } = await api.get("/produtos/");
  return data;
};

export const getProduto = async (id: string): Promise<Produto> => {
  const { data } = await api.get(`/produtos/${id}`);
  return data;
};

export const criarProduto = async (produto: ProdutoForm): Promise<Produto> => {
  const { data } = await api.post("/produtos/", produto);
  return data;
};

export const atualizarProduto = async (
  id: string,
  produto: Partial<ProdutoForm>,
): Promise<Produto> => {
  const { data } = await api.put(`/produtos/${id}`, produto);
  return data;
};

export const deletarProduto = async (id: string): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};
