
class SongNode {
  constructor(song) {
    this.song = song;
    this.next = null;
  }
}

export class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(song) {
    const newNode = new SongNode(song);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.song;
  }

  toArray() {
    const songs = [];
    let current = this.head;

    while (current !== null) {
      songs.push(current.song);
      current = current.next;
    }

    return songs;
  }

  get length() {
    return this.size;
  }
}
