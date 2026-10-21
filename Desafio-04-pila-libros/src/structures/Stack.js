
class Stack {
  constructor() {
    this.books = [];
  }

  push(book) {
    this.books.push(book);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.books.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.books[this.books.length - 1];
  }

  isEmpty() {
    return this.books.length === 0;
  }

  size() {
    return this.books.length;
  }

  getAll() {
    return [...this.books].reverse();
  }
}

export default Stack;
