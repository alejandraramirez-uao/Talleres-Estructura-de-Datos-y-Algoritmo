
export class MenuNode {
  constructor(title, link) {
    this.title = title;
    this.link = link;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

export class MenuTree {
  constructor() {
    this.root = new MenuNode('Menú principal', '#');
  }

  addMenu(parentTitle, title, link) {
    const parent = this.find(parentTitle);

    if (!parent) {
      return false;
    }

    parent.addChild(new MenuNode(title, link));
    return true;
  }

  find(title, node = this.root) {
    if (node.title === title) {
      return node;
    }

    for (const child of node.children) {
      const result = this.find(title, child);

      if (result) {
        return result;
      }
    }

    return null;
  }
}
