
import Trie from "./Trie";
import MaxHeap from "./MaxHeap";

class SmartSearch {
  constructor() {
    this.trie = new Trie();
    this.products = [];
  }

  insert(name, popularity) {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new Error("El nombre del producto es obligatorio.");
    }

    if (!Number.isFinite(popularity) || popularity < 0) {
      throw new Error("La popularidad debe ser un número mayor o igual a cero.");
    }

    const existing = this.products.find(
      (product) =>
        product.name.toLowerCase() === normalizedName.toLowerCase()
    );

    if (existing) {
      throw new Error("Ese producto ya está registrado.");
    }

    const product = {
      name: normalizedName,
      popularity,
    };

    this.products.push(product);
    this.trie.insert(product);
  }

  searchTopK(prefix, k) {
    const matches = this.trie.searchByPrefix(prefix);
    const heap = new MaxHeap();

    matches.forEach((product) => heap.insert(product));

    return heap.getTopK(k);
  }

  getAllProducts() {
    return [...this.products].sort(
      (a, b) => b.popularity - a.popularity
    );
  }
}

export default SmartSearch;
