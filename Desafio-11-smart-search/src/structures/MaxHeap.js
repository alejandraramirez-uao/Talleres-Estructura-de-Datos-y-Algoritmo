
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(product) {
    this.heap.push(product);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (
        this.heap[parentIndex].popularity >=
        this.heap[index].popularity
      ) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return max;
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < length &&
        this.heap[left].popularity > this.heap[largest].popularity
      ) {
        largest = left;
      }

      if (
        right < length &&
        this.heap[right].popularity > this.heap[largest].popularity
      ) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }

  getTopK(k) {
    const copy = new MaxHeap();

    this.heap.forEach((product) => copy.insert(product));

    const results = [];
    const limit = Math.min(Math.max(0, Math.floor(k)), copy.heap.length);

    for (let i = 0; i < limit; i++) {
      results.push(copy.extractMax());
    }

    return results;
  }
}

export default MaxHeap;
