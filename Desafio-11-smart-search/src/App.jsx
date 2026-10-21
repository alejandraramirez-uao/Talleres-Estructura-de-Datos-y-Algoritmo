
import { useMemo, useState } from "react";
import SmartSearch from "./structures/SmartSearch";
import ProductCard from "./components/ProductCard";
import "./App.css";

const initialProducts = [
  { name: "Air Max", popularity: 98 },
  { name: "Air Force", popularity: 95 },
  { name: "Air Jordan", popularity: 92 },
  { name: "Adidas Boost", popularity: 88 },
  { name: "Adidas Samba", popularity: 85 },
  { name: "Air Zoom", popularity: 80 },
  { name: "Nike Dunk", popularity: 76 },
  { name: "New Balance", popularity: 72 },
  { name: "Puma Suede", popularity: 68 },
  { name: "Reebok Classic", popularity: 61 },
];

function createInitialSearch() {
  const search = new SmartSearch();
  initialProducts.forEach((product) => {
    search.insert(product.name, product.popularity);
  });
  return search;
}

function App() {
  const [search, setSearch] = useState(createInitialSearch);
  const [prefix, setPrefix] = useState("");
  const [topK, setTopK] = useState("5");
  const [productName, setProductName] = useState("");
  const [popularity, setPopularity] = useState("50");
  const [message, setMessage] = useState("");

  const products = useMemo(() => search.getAllProducts(), [search]);

  const results = useMemo(() => {
    if (!prefix.trim()) return [];
    return search.searchTopK(prefix, Number(topK));
  }, [search, prefix, topK]);

  function addProduct(event) {
    event.preventDefault();

    const name = productName.trim();
    const score = Number(popularity);

    if (!name || !Number.isFinite(score) || score < 0) {
      setMessage("Ingresa un nombre y una popularidad válida.");
      return;
    }

    const updatedSearch = new SmartSearch();

    try {
      search.getAllProducts().forEach((product) => {
        updatedSearch.insert(product.name, product.popularity);
      });

      updatedSearch.insert(name, score);
      setSearch(updatedSearch);
      setProductName("");
      setPopularity("50");
      setMessage(`¡${name} se agregó correctamente!`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="brand">
          <div className="brand-icon">⌕</div>
          <span>SMART<span className="brand-light">SEARCH</span></span>
        </div>

        <p className="eyebrow">DESAFÍO 11 · ESTRUCTURAS DE DATOS</p>
        <h1>Encuentra lo que buscas.</h1>
        <p className="hero-description">
          Búsqueda inteligente por prefijo, con los resultados más populares
          en primer lugar.
        </p>

        <div className="hero-stats">
          <div><strong>{products.length}</strong><span>Productos</span></div>
          <div><strong>Trie</strong><span>Búsqueda por prefijo</span></div>
          <div><strong>MaxHeap</strong><span>Top resultados</span></div>
        </div>
      </header>

      <section className="panel search-panel">
        <div className="section-heading">
          <div className="section-icon">⌕</div>
          <div>
            <h2>Buscador inteligente</h2>
            <p>Escribe el inicio del nombre de un producto.</p>
          </div>
        </div>

        <label htmlFor="prefix">¿Qué producto buscas?</label>
        <div className="search-row">
          <div className="search-input-wrap">
            <span>⌕</span>
            <input
              id="prefix"
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
              placeholder="Prueba con air, adidas, nike..."
            />
            {prefix && (
              <button
                type="button"
                className="clear-button"
                onClick={() => setPrefix("")}
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>

          <div className="top-k-control">
            <label htmlFor="topK">Resultados</label>
            <select
              id="topK"
              value={topK}
              onChange={(event) => setTopK(event.target.value)}
            >
              <option value="3">Top 3</option>
              <option value="5">Top 5</option>
              <option value="8">Top 8</option>
              <option value="10">Top 10</option>
            </select>
          </div>
        </div>

        <div className="suggestions">
          <span>Prueba:</span>
          {["air", "adidas", "nike", "puma"].map((term) => (
            <button
              type="button"
              key={term}
              className="suggestion"
              onClick={() => setPrefix(term)}
            >
              {term}
            </button>
          ))}
        </div>

        <div className="results-heading">
          <div>
            <h2>{prefix.trim() ? "Resultados de búsqueda" : "Explora los productos"}</h2>
            <p>
              {prefix.trim()
                ? `${results.length} resultado(s) para "${prefix}"`
                : "Escribe un prefijo para encontrar productos."}
            </p>
          </div>
          {prefix.trim() && <span className="result-count">{results.length} encontrados</span>}
        </div>

        {prefix.trim() ? (
          results.length > 0 ? (
            <div className="product-list">
              {results.map((product, index) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  position={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No encontramos resultados</h3>
              <p>Prueba con otro prefijo, como “air” o “nike”.</p>
            </div>
          )
        ) : (
          <div className="product-list">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                position={index + 1}
              />
            ))}
          </div>
        )}
      </section>

      <div className="bottom-grid">
        <section className="panel add-panel">
          <div className="section-heading">
            <div className="section-icon">＋</div>
            <div>
              <h2>Agregar producto</h2>
              <p>Amplía tu catálogo de búsqueda.</p>
            </div>
          </div>

          <form onSubmit={addProduct} className="product-form">
            <label htmlFor="productName">Nombre del producto</label>
            <input
              id="productName"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="Ej. Air Max Plus"
              required
            />

            <label htmlFor="popularity">Popularidad (0 o más)</label>
            <input
              id="popularity"
              type="number"
              min="0"
              step="1"
              value={popularity}
              onChange={(event) => setPopularity(event.target.value)}
              required
            />

            <button className="primary-button" type="submit">
              Agregar producto <span>→</span>
            </button>

            {message && <p className="form-message" role="status">{message}</p>}
          </form>
        </section>

        <section className="panel info-panel">
          <div className="section-heading">
            <div className="section-icon">⌘</div>
            <div>
              <h2>¿Cómo funciona?</h2>
              <p>Dos estructuras, una búsqueda más eficiente.</p>
            </div>
          </div>

          <div className="algorithm-item">
            <span className="algorithm-number">01</span>
            <div>
              <h3>Trie</h3>
              <p>Encuentra los productos que coinciden con el prefijo escrito.</p>
              <span className="complexity">Búsqueda por caracteres</span>
            </div>
          </div>

          <div className="algorithm-item">
            <span className="algorithm-number second">02</span>
            <div>
              <h3>MaxHeap</h3>
              <p>Ordena los candidatos por popularidad y devuelve los primeros K.</p>
              <span className="complexity">Prioridad por popularidad</span>
            </div>
          </div>
        </section>
      </div>

      <footer>Desafío 11 · Smart Search Engine + Top Results</footer>
    </main>
  );
}

export default App;

