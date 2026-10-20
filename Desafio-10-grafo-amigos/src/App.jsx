
import { useMemo, useState } from "react";
import Graph from "./structures/Graph";
import GraphView from "./components/GraphView";
import "./App.css";

const createInitialGraph = () => {
  const graph = new Graph();

  graph.addCity("Cali");
  graph.addCity("Bogotá");
  graph.addCity("Medellín");
  graph.addCity("Cartagena");
  graph.addCity("Pereira");

  graph.addPerson("Laura", 22, "Cali");
  graph.addPerson("Andrés", 25, "Cali");
  graph.addPerson("Sofía", 21, "Bogotá");
  graph.addPerson("Daniel", 28, "Medellín");
  graph.addPerson("Valentina", 24, "Cartagena");
  graph.addPerson("Mateo", 26, "Pereira");
  graph.addPerson("Camila", 23, "Bogotá");

  return graph;
};

function App() {
  const [graph, setGraph] = useState(createInitialGraph);
  const [cityFilter, setCityFilter] = useState("Todas");
  const [personName, setPersonName] = useState("");
  const [personAge, setPersonAge] = useState("");
  const [personCity, setPersonCity] = useState("Cali");
  const [message, setMessage] = useState("");

  const graphData = useMemo(() => graph.getGraphData(), [graph]);

  const peopleFound =
    cityFilter === "Todas"
      ? graph.people
      : graph.getPeopleByCity(cityFilter);

  const addPerson = (event) => {
    event.preventDefault();

    const name = personName.trim();
    const age = Number(personAge);

    if (!name || !Number.isInteger(age) || age < 1 || age > 120) {
      setMessage("Ingresa un nombre y una edad válida entre 1 y 120.");
      return;
    }

    const updatedGraph = Object.assign(
      Object.create(Object.getPrototypeOf(graph)),
      graph,
      {
        nodes: [...graph.nodes],
        links: [...graph.links],
        people: [...graph.people],
        cities: [...graph.cities],
      }
    );

    try {
      updatedGraph.addPerson(name, age, personCity);
      setGraph(updatedGraph);
      setPersonName("");
      setPersonAge("");
      setCityFilter(personCity);
      setMessage(`${name} se agregó correctamente al grafo.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="app">
      <header className="hero">
        <div className="hero-icon">⌘</div>
        <p className="eyebrow">DESAFÍO 10 · ESTRUCTURAS DE DATOS</p>
        <h1>Grafo de amigos y ciudades</h1>
        <p>
          Conecta personas con sus ciudades y descubre quién vive en cada lugar.
        </p>
        <div className="hero-stats">
          <div>
            <strong>{graph.people.length}</strong>
            <span>Personas</span>
          </div>
          <div>
            <strong>{graph.cities.length}</strong>
            <span>Ciudades</span>
          </div>
          <div>
            <strong>{graph.links.length}</strong>
            <span>Conexiones</span>
          </div>
        </div>
      </header>

      <section className="panel">
        <div className="section-heading">
          <span className="section-icon">◎</span>
          <div>
            <h2>Visualización del grafo</h2>
            <p>Cada persona está conectada con la ciudad donde vive.</p>
          </div>
        </div>

        <div className="legend">
          <span><i className="dot person-dot" /> Personas</span>
          <span><i className="dot city-dot" /> Ciudades</span>
        </div>

        <GraphView data={graphData} />
      </section>

      <div className="content-grid">
        <section className="panel">
          <div className="section-heading">
            <span className="section-icon">＋</span>
            <div>
              <h2>Agregar persona</h2>
              <p>Registra una persona y asígnale una ciudad.</p>
            </div>
          </div>

          <form className="person-form" onSubmit={addPerson}>
            <label htmlFor="personName">Nombre completo</label>
            <input
              id="personName"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              placeholder="Ej. Mariana López"
              required
            />

            <label htmlFor="personAge">Edad</label>
            <input
              id="personAge"
              type="number"
              min="1"
              max="120"
              value={personAge}
              onChange={(event) => setPersonAge(event.target.value)}
              placeholder="Ej. 24"
              required
            />

            <label htmlFor="personCity">Ciudad</label>
            <select
              id="personCity"
              value={personCity}
              onChange={(event) => setPersonCity(event.target.value)}
            >
              {graph.cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <button type="submit">Agregar al grafo <span>→</span></button>
            {message && <p className="form-message" role="status">{message}</p>}
          </form>
        </section>

        <section className="panel">
          <div className="section-heading">
            <span className="section-icon">⌕</span>
            <div>
              <h2>Personas por ciudad</h2>
              <p>Consulta quién vive en una ciudad específica.</p>
            </div>
          </div>

          <label className="filter-label" htmlFor="cityFilter">
            Selecciona una ciudad
          </label>
          <select
            id="cityFilter"
            className="city-filter"
            value={cityFilter}
            onChange={(event) => setCityFilter(event.target.value)}
          >
            <option value="Todas">Todas las ciudades</option>
            {graph.cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <p className="results-count">
            {peopleFound.length} {peopleFound.length === 1 ? "persona encontrada" : "personas encontradas"}
          </p>

          <div className="people-list">
            {peopleFound.length > 0 ? (
              peopleFound.map((person) => (
                <article className="person-card" key={person.id}>
                  <div className="avatar">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="person-info">
                    <strong>{person.name}</strong>
                    <span>{person.age} años</span>
                  </div>
                  <span className="city-tag">{person.city}</span>
                </article>
              ))
            ) : (
              <p className="empty-message">No hay personas registradas en esta ciudad.</p>
            )}
          </div>
        </section>
      </div>

      <footer>Desafío 10 · Grafos · Estructuras de Datos y Algoritmos</footer>
    </main>
  );
}

export default App;
