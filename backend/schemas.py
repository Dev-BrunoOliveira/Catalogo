from pydantic import BaseModel
from typing import Optional

class ProdutoCreate(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: float
    categoria: Optional[str] = None
    imagem_url: Optional[str] = None
    estoque: int = 0

class ProdutoUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    preco: Optional[float] = None
    categoria: Optional[str] = None
    imagem_url: Optional[str] = None
    estoque: Optional[int] = None