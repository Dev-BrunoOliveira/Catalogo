from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.produtos import router as produtos_router

app = FastAPI(title="Catálogo de Produtos API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(produtos_router)

@app.get("/")
def root():
    return {"status": "API rodando"}