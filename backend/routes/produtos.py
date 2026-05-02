from fastapi import APIRouter, HTTPException
from database import supabase
from schemas import ProdutoCreate, ProdutoUpdate

router = APIRouter(prefix="/produtos", tags=["Produtos"])

@router.get("/")
def listar_produtos():
    response = supabase.table("produtos").select("*").execute()
    return response.data

@router.get("/{id}")
def buscar_produto(id: str):
    response = supabase.table("produtos").select("*").eq("id", id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return response.data

@router.post("/", status_code=201)
def criar_produto(produto: ProdutoCreate):
    response = supabase.table("produtos").insert(produto.model_dump()).execute()
    return response.data[0]

@router.put("/{id}")
def atualizar_produto(id: str, produto: ProdutoUpdate):
    data = {k: v for k, v in produto.model_dump().items() if v is not None}
    response = supabase.table("produtos").update(data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return response.data[0]

@router.delete("/{id}", status_code=204)
def deletar_produto(id: str):
    supabase.table("produtos").delete().eq("id", id).execute()
    return None