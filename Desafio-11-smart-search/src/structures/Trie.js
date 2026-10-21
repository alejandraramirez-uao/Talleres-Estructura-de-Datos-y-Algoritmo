
class TrieNode {
  constructor() {
    this.children = {};
    this.products = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(product) {
    const name = product.name.trim().toLowerCase();

    if (!name) return;

    let current = this.root;

    for (const character of name) {
      if (!current.children[character]) {
        current.children[character] = new TrieNode();
      }

      current = current.children[character];

      if (!current.products.some((item) => item.name === product.name)) {
        current.products.push(product);
      }
    }
  }

  searchByPrefix(prefix) {
    const normalizedPrefix = prefix.trim().toLowerCase();

    if (!normalizedPrefix) return [];

    let current = this.root;

    for (const character of normalizedPrefix) {
      current = current.children[character];

      if (!current) return [];
    }

    return [...current.products];
  }
}

export default Trie;
