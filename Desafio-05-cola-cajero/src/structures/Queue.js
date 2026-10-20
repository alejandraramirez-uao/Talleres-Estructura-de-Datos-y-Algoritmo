
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(person) {
    this.items.push(person);
  }

  dequeue() {
    return this.items.shift() ?? null;
  }

  getAll() {
    return [...this.items];
  }

  get size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export { Queue };
