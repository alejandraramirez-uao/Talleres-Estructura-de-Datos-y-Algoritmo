
import { useState } from 'react';
import { Queue } from '../structures/Queue';

function fechaAleatoria() {
  const ahora = new Date();
  const minutosAtras = Math.floor(Math.random() * 180);
  return new Date(
    ahora.getTime() - minutosAtras * 60000
  ).toISOString();
}

const personasIniciales = [
  { name: 'María López', amount: 200000 },
  { name: 'Carlos Pérez', amount: 500000 },
  { name: 'Laura Gómez', amount: 150000 },
  { name: 'Andrés Rodríguez', amount: 300000 },
  { name: 'Sofía Martínez', amount: 100000 },
].map((persona) => ({
  ...persona,
  arrivalDate: fechaAleatoria(),
}));

function crearColaInicial() {
  const cola = new Queue();

  personasIniciales.forEach((persona) => {
    cola.enqueue(persona);
  });

  return cola;
}

export default function ATMPage() {
  const [cola, setCola] = useState(crearColaInicial);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  const personas = cola
    .getAll()
    .sort(
      (a, b) =>
        new Date(a.arrivalDate) - new Date(b.arrivalDate)
    );

  function agregarPersona(event) {
    event.preventDefault();

    const persona = {
      name: nombre.trim(),
      amount: Number(monto),
      arrivalDate: new Date().toISOString(),
    };

    const nuevaCola = new Queue();

    [...cola.getAll(), persona].forEach((item) => {
      nuevaCola.enqueue(item);
    });

    setCola(nuevaCola);
    setNombre('');
    setMonto('');
  }

  function atenderPersona() {
    const nuevaCola = new Queue();

    cola.getAll().slice(1).forEach((persona) => {
      nuevaCola.enqueue(persona);
    });

    setCola(nuevaCola);
  }

  function formatoFecha(fecha) {
    return new Date(fecha).toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  return (
    <main className="panel">
      <h1>Cajero automático</h1>
      <p>Total de personas en espera: {cola.size}</p>

      <form onSubmit={agregarPersona} className="formulario">
        <label>
          Nombre completo
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Ingresa el nombre"
            required
          />
        </label>

        <label>
          Monto a retirar (COP)
          <input
            type="number"
            min="1"
            step="1000"
            value={monto}
            onChange={(event) => setMonto(event.target.value)}
            placeholder="Ej. 200000"
            required
          />
        </label>

        <button type="submit">Agregar a la cola</button>
      </form>

      <h2>Personas en espera</h2>

      {personas.length === 0 ? (
        <p>No hay personas en espera.</p>
      ) : (
        <ol>
          {personas.map((persona, index) => (
            <li key={`${persona.name}-${persona.arrivalDate}`}>
              <article className="persona">
                <h3>{persona.name}</h3>

                <p>
                  Monto: $
                  {persona.amount.toLocaleString('es-CO')} COP
                </p>

                <p>
                  Fecha de llegada:{' '}
                  {formatoFecha(persona.arrivalDate)}
                </p>

                {index === 0 && (
                  <strong>Primero en la fila</strong>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        onClick={atenderPersona}
        disabled={cola.isEmpty()}
      >
        Atender siguiente persona
      </button>
    </main>
  );
}
