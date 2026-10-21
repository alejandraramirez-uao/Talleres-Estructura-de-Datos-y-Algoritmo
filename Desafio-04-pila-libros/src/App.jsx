
import { useState } from "react";
import Stack from "./structures/Stack";
import initialBooks from "./data/books";
import BookForm from "./components/BookForm";
import BookStack from "./components/BookStack";
import "./App.css";

function createInitialStack() {
  const stack = new Stack();

  initialBooks.forEach((book) => {
    stack.push(book);
  });

  return stack;
}

function App() {
  const [stack, setStack] = useState(createInitialStack);
  const [message, setMessage] = useState("");

  const books = stack.getAll();

  function addBook(book) {
    if (stack.getAll().some((item) => item.isbn === book.isbn)) {
      setMessage("Ya existe un libro con ese ISBN.");
      return;
    }

    const updatedStack = new Stack();
    stack.books.forEach((item) => updatedStack.push(item));
    updatedStack.push(book);

    setStack(updatedStack);
    setMessage(`"${book.name}" se agregó a la cima de la pila.`);
  }

  function removeBook(isbn) {
    const currentBooks = [...stack.books];
    const topBook = currentBooks[currentBooks.length - 1];

    if (!topBook || topBook.isbn !== isbn) {
      setMessage("Solo puedes retirar el libro que está en la cima de la pila.");
      return;
    }

    const updatedStack = new Stack();
    currentBooks.slice(0, -1).forEach((book) => updatedStack.push(book));

    setStack(updatedStack);
    setMessage(`"${topBook.name}" se retiró de la pila.`);
  }

  function peekBook(book) {
    setMessage(
      stack.peek()?.isbn === book.isbn
        ? `Libro en la cima: "${book.name}".`
        : `"${book.name}" está en la posición ${books.findIndex((item) => item.isbn === book.isbn) + 1} de la pila.`
    );
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="brand">
          <span className="brand-icon">▤</span>
          <span>BOOK<span className="brand-light">STACK</span></span>
        </div>

        <p className="eyebrow">DESAFÍO 04 · ESTRUCTURAS DE DATOS</p>
        <h1>Tu biblioteca, en orden.</h1>
        <p className="hero-description">
          Administra tus libros con una pila: agrega, consulta y retira libros
          siguiendo el principio LIFO.
        </p>

        <div className="hero-stats">
          <div>
            <strong>{stack.size()}</strong>
            <span>Libros en la pila</span>
          </div>
          <div>
            <strong>LIFO</strong>
            <span>Último en entrar, primero en salir</span>
          </div>
          <div>
            <strong>{stack.peek() ? "Disponible" : "Vacía"}</strong>
            <span>Estado de la cima</span>
          </div>
        </div>
      </header>

      {message && (
        <div className="status-message" role="status">
          <span>ℹ</span>
          <p>{message}</p>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Cerrar mensaje"
          >
            ×
          </button>
        </div>
      )}

      <div className="content-grid">
        <section className="panel">
          <BookForm onAddBook={addBook} />
        </section>

        <section className="panel info-panel">
          <div className="section-heading">
            <div className="section-icon">↕</div>
            <div>
              <h2>¿Cómo funciona una pila?</h2>
              <p>Los libros se administran por la cima.</p>
            </div>
          </div>

          <div className="operation-card">
            <span className="operation-symbol">↑</span>
            <div>
              <strong>Push</strong>
              <p>Agrega un nuevo libro a la cima.</p>
            </div>
          </div>

          <div className="operation-card">
            <span className="operation-symbol remove-symbol">↓</span>
            <div>
              <strong>Pop</strong>
              <p>Retira únicamente el libro de la cima.</p>
            </div>
          </div>

          <div className="operation-card">
            <span className="operation-symbol peek-symbol">◎</span>
            <div>
              <strong>Peek</strong>
              <p>Consulta el libro superior sin retirarlo.</p>
            </div>
          </div>

          <div className="lifo-note">
            <strong>Principio LIFO</strong>
            <p>Last In, First Out: el último en entrar es el primero en salir.</p>
          </div>
        </section>
      </div>

      <section className="panel stack-panel">
        <BookStack
          books={books}
          onRemoveBook={removeBook}
          onPeekBook={peekBook}
        />
      </section>

      <footer>Desafío 04 · Pila de libros · Estructuras de Datos y Algoritmos</footer>
    </main>
  );
}

export default App;

