
class PageNode {
  constructor(page) {
    this.page = page;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(page) {
    const newNode = new PageNode(page);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current;

    if (index < this.size / 2) {
      current = this.head;

      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      current = this.tail;

      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    return current.page;
  }

  toArray() {
    const pages = [];
    let current = this.head;

    while (current !== null) {
      pages.push(current.page);
      current = current.next;
    }

    return pages;
  }

  get length() {
    return this.size;
  }
}
