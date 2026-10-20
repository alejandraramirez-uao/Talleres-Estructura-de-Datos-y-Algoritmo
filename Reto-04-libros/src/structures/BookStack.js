
export class BookStack {
  constructor() {
    this.books = [];
  }

  push(book) {
    this.books.push(book);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    return this.books.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.books[this.books.length - 1];
  }

  getAll() {
    return [...this.books].reverse();
  }

  isEmpty() {
    return this.books.length === 0;
  }

  get size() {
    return this.books.length;
  }
}
