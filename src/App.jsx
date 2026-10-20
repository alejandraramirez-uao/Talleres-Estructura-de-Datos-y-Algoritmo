
import { useState } from 'react';
import SongsPage from './pages/SongsPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  const [pagina, setPagina] = useState('songs');

  return (
    <>
      <nav className="botones">
        <button onClick={() => setPagina('songs')}>
          Canciones
        </button>

        <button onClick={() => setPagina('history')}>
          Historial
        </button>
      </nav>

      {pagina === 'songs' ? (
        <SongsPage />
      ) : (
        <HistoryPage onVolver={() => setPagina('songs')} />
      )}
    </>
  );
}

export default App;

