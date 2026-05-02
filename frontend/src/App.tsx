import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaProdutos from './pages/ListaProdutos'
import FormProduto from './pages/FormProduto'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950">
        <Routes>
          <Route path="/" element={<ListaProdutos />} />
          <Route path="/novo" element={<FormProduto />} />
          <Route path="/editar/:id" element={<FormProduto />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}