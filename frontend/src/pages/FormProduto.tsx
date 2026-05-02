import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarProduto, atualizarProduto, getProduto } from "../services/api";
import type { ProdutoForm } from "../types/produto";

const inicial: ProdutoForm = {
  nome: "",
  descricao: "",
  preco: 0,
  categoria: "",
  imagem_url: "",
  estoque: 0,
};

export default function FormProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProdutoForm>(inicial);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id)
      getProduto(id).then((p) =>
        setForm({
          nome: p.nome,
          descricao: p.descricao ?? "",
          preco: p.preco,
          categoria: p.categoria ?? "",
          imagem_url: p.imagem_url ?? "",
          estoque: p.estoque,
        }),
      );
  }, [id]);

  const handleSubmit = async () => {
    if (isEdit && id) {
      await atualizarProduto(id, form);
    } else {
      await criarProduto(form);
    }
    navigate("/");
  };

  const field = (label: string, key: keyof ProdutoForm, type = "text") => (
    <div>
      <label className="text-sm text-zinc-400 block mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) =>
          setForm({
            ...form,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          })
        }
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm outline-none"
      />
    </div>
  );

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-medium text-white mb-6">
        {isEdit ? "Editar Produto" : "Novo Produto"}
      </h1>
      <div className="flex flex-col gap-4">
        {field("Nome", "nome")}
        {field("Descrição", "descricao")}
        {field("Preço", "preco", "number")}
        {field("Categoria", "categoria")}
        {field("URL da Imagem", "imagem_url")}
        {field("Estoque", "estoque", "number")}
        <button
          onClick={handleSubmit}
          className="bg-violet-600 text-white py-2 rounded-lg text-sm mt-2"
        >
          {isEdit ? "Salvar alterações" : "Criar produto"}
        </button>
      </div>
    </div>
  );
}
