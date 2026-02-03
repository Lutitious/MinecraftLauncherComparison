import { Routes, Route, Link } from 'react-router-dom'
import Comparison from './pages/Comparison'
import Launcher from './pages/Launcher'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">Minecraft Launcher Comparison</Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Comparison/>} />
          <Route path="/launcher/:id" element={<Launcher/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </div>
  )
}
