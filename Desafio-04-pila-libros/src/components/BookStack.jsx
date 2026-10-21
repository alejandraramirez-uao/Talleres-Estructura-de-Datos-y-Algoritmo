
function BookStack({ books, onRemoveBook, onPeekBook }) {
  return (
    <section className="stack-section">
      <div className="section-heading">
        <div className="section-icon">▤</div>
        <div>
          <h2>Pila de libros</h2>
          <p>El último libro agregado queda en la cima.</p>
        </div>
        <span className="book-count">{books.length} libros</span>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <span>📚</span>
          <h3>Tu pila está vacía</h3>
          <p>Agrega un libro usando el formulario.</p>
        </div>
      ) : (
        <>
          <div className="stack-top-label">
            <span className="top-indicator" />
            CIMA DE LA PILA
          </div>

          <div className="book-list">
            {books.map((book, index) => (
              <article
                className={`book-card ${index === 0 ? "top-book" : ""}`}
                key={book.isbn}
              >
                <div className="book-cover">
                  <span>LIBRO</span>
                  <strong>{book.name.charAt(0).toUpperCase()}</strong>
                </div>

                <div className="book-details">
                  <h3>{book.name}</h3>
                  <p><strong>Autor:</strong> {book.author}</p>
                  <p><strong>ISBN:</strong> {book.isbn}</p>
                  <p><strong>Editorial:</strong> {book.editorial}</p>
                  {index === 0 && (
                    <span className="top-badge">Último agregado</span>
                  )}
                </div>

                <div className="book-actions">
                  <button
                    type="button"
                    className="peek-button"
                    onClick={() => onPeekBook(book)}
                    title="Consultar libro"
                  >
                    Ver
                  </button>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => onRemoveBook(book.isbn)}
                    title="Retirar libro de la pila"
                  >
                    Retirar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default BookStack;
