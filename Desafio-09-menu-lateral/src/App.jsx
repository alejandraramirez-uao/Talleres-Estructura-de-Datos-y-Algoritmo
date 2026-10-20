
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import tree from './structures/menuData';
import './App.css';

export default function App() {
  const [paginaActual, setPaginaActual] = useState({
    title: 'Inicio',
    link: '/',
  });

  function navegar(item) {
    setPaginaActual(item);
  }

  return (
    <div className="app">
      <Sidebar tree={tree} onNavigate={navegar} />

      <main className="contenido">
        <header className="barra-superior">
          <span>Desafío 09</span>
          <span>Menú lateral con árbol N-ario</span>
        </header>

        <section className="bienvenida">
          <span className="etiqueta">ESTRUCTURAS DE DATOS</span>
          <h1>{paginaActual.title}</h1>
          <p>
            Bienvenida a tu aplicación de navegación mediante un árbol N-ario.
          </p>

          <div className="tarjeta">
            <h2>Página seleccionada</h2>
            <p>
              Has seleccionado: <strong>{paginaActual.title}</strong>
            </p>
            <p>Ruta: {paginaActual.link}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
