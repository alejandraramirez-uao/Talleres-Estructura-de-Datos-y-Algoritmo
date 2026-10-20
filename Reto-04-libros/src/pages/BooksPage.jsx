
import { useState } from 'react';
import { BookStack } from '../structures/BookStack';

const librosIniciales = [
  {
    name: 'Cien años de soledad',
    isbn: '9780307474728',
    author: 'Gabriel García Márquez',
    editorial: 'Sudamericana',
  },
  {
    name: 'El principito',
    isbn: '9780156012195',
    author: 'Antoine de Saint-Exupéry',
    editorial: 'Reynal & Hitchcock',
  },
  {
    name: 'Don Quijote de la Mancha',
    isbn: '9788420412146',
    author: 'Miguel de Cervantes',
    editorial: 'Alfaguara',
  },
];

function crearPilaInicial() {
  const pila = new BookStack();

  librosIniciales.forEach((libro) => pila.push(libro));

  return pila;
}

export default function BooksPage() {
  const [pila, setPila] = useState(crearPilaInicial);

  const [nombre, setNombre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [autor, setAutor] = useState('');
  const [editorial, setEditorial] = useState('');

  function agregarLibro(event) {
    event.preventDefault();

    const libro = {
      name: nombre.trim(),
      isbn: isbn.trim(),
      author: autor.trim(),
      editorial: editorial.trim(),
    };

    // Crear una nueva pila conservando el orden original.
    const nuevaPila = new BookStack();

    pila.getAll().reverse().forEach((item) => {
      nuevaPila.push(item);
    });

    // El nuevo libro queda en la cima.
    nuevaPila.push(libro);
    setPila(nuevaPila);

    setNombre('');
    setIsbn('');
    setAutor('');
    setEditorial('');
  }

  function retirarLibro() {
    if (pila.isEmpty()) return;

    const nuevaPila = new BookStack();

    pila.getAll().reverse().forEach((item) => {
      nuevaPila.push(item);
    });

    nuevaPila.pop();
    setPila(nuevaPila);
  }

  // Mostrar primero el libro que está en la cima.
  const libros = pila.getAll();

  return (
    <main className="panel">
      <h1>Pila de libros</h1>

      <p>Total de libros: {pila.size}</p>

      <form onSubmit={agregarLibro} className="formulario">
        <label>
          Nombre del libro
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          ISBN
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </label>

        <label>
          Autor
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </label>

        <label>
          Editorial
          <input
            type="text"
            value={editorial}
            onChange={(e) => setEditorial(e.target.value)}
            required
          />
        </label>

        <button type="submit">
          Agregar libro a la pila
        </button>
      </form>

      <h2>Libros en la pila</h2>

      {libros.length === 0 ? (
        <p>La pila está vacía.</p>
      ) : (
        <ol>
          {libros.map((libro, index) => (
            <li key={`${libro.isbn}-${index}`}>
              <strong>{libro.name}</strong>

              <p>ISBN: {libro.isbn}</p>
              <p>Autor: {libro.author}</p>
              <p>Editorial: {libro.editorial}</p>

              {index === 0 && (
                <strong>← Cima de la pila</strong>
              )}
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        onClick={retirarLibro}
        disabled={pila.isEmpty()}
      >
        Retirar libro de la cima
      </button>
    </main>
  );
}
