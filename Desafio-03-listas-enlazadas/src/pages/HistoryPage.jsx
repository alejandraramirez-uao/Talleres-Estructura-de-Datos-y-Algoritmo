
import { useState } from 'react';
import { DoublyLinkedList } from '../structures/DoublyLinkedList';

const paginasIniciales = [
  { title: 'Página de inicio', url: '/' },
  { title: 'Canciones', url: '/songs' },
  { title: 'Historial', url: '/history' },
  { title: 'Información', url: '/info' },
];

function crearHistorial() {
  const historial = new DoublyLinkedList();

  paginasIniciales.forEach((pagina) => {
    historial.append(pagina);
  });

  return historial;
}

export default function HistoryPage({ onVolver }) {
  const [historial] = useState(crearHistorial);
  const [indice, setIndice] = useState(0);

  const paginas = historial.toArray();
  const paginaActual = historial.getAt(indice);

  return (
    <main className="panel">
      <h1>Historial de navegación</h1>

      <p>
        Página {indice + 1} de {historial.length}
      </p>

      {paginaActual && (
        <section className="cancion">
          <h2>{paginaActual.title}</h2>
          <p>Ruta: {paginaActual.url}</p>
        </section>
      )}

      <div className="botones">
        <button
          onClick={() => setIndice((actual) => Math.max(0, actual - 1))}
          disabled={indice === 0}
        >
          ← Anterior
        </button>

        <button
          onClick={() =>
            setIndice((actual) =>
              Math.min(historial.length - 1, actual + 1)
            )
          }
          disabled={indice === historial.length - 1}
        >
          Siguiente →
        </button>
      </div>

      <h3>Páginas visitadas</h3>

      <ol>
        {paginas.map((pagina, posicion) => (
          <li key={pagina.url}>
            {pagina.title} — {pagina.url}
            {posicion === indice ? ' ▶' : ''}
          </li>
        ))}
      </ol>

      <button onClick={onVolver}>Volver a canciones</button>
    </main>
  );
}
