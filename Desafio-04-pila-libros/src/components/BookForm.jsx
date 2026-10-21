
import { useState } from "react";

function BookForm({ onAddBook }) {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const book = {
      name: name.trim(),
      isbn: isbn.trim(),
      author: author.trim(),
      editorial: editorial.trim(),
    };

    if (!book.name || !book.isbn || !book.author || !book.editorial) {
      return;
    }

    onAddBook(book);

    setName("");
    setIsbn("");
    setAuthor("");
    setEditorial("");
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="form-icon">＋</span>
        <div>
          <h2>Agregar un libro</h2>
          <p>Completa los datos para añadirlo a la pila.</p>
        </div>
      </div>

      <label htmlFor="book-name">Nombre del libro</label>
      <input
        id="book-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ej. El amor en los tiempos del cólera"
        required
      />

      <label htmlFor="book-isbn">ISBN</label>
      <input
        id="book-isbn"
        value={isbn}
        onChange={(event) => setIsbn(event.target.value)}
        placeholder="Ej. 9780307474728"
        required
      />

      <label htmlFor="book-author">Autor</label>
      <input
        id="book-author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Nombre del autor"
        required
      />

      <label htmlFor="book-editorial">Editorial</label>
      <input
        id="book-editorial"
        value={editorial}
        onChange={(event) => setEditorial(event.target.value)}
        placeholder="Nombre de la editorial"
        required
      />

      <button className="primary-button" type="submit">
        Agregar a la pila <span>→</span>
      </button>
    </form>
  );
}

export default BookForm;
