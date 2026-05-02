import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProdutos, deletarProduto } from "../services/api";
import type { Produto } from "../types/produto";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    const data = await getProdutos();
    setProdutos(data);
    setLoading(false);
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Deletar produto?")) return;
    await deletarProduto(id);
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  if (loading) return <p className="p-8 text-gray-400">Carregando...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-white">
          Catálogo de Produtos
        </h1>
        <Link
          to="/novo"
          className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Novo Produto
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {produtos.map((p) => (
          <div
            key={p.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            {p.imagem_url && (
              <img
                src={p.imagem_url}
                alt={p.nome}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}
            <p className="text-white font-medium">{p.nome}</p>
            <p className="text-zinc-500 text-sm mb-1">{p.categoria}</p>
            <p className="text-violet-400 font-medium mb-3">
              R$ {p.preco.toFixed(2)}
            </p>
            <div className="flex gap-2">
              <Link
                to={`/editar/${p.id}`}
                className="flex-1 text-center border border-zinc-700 text-zinc-400 text-xs py-2 rounded-lg"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDeletar(p.id)}
                className="flex-1 text-center border border-red-900 text-red-400 text-xs py-2 rounded-lg"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
