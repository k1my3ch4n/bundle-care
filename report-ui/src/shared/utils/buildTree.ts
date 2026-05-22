export interface TreeNode {
  name: string;
  path: string;
  size: number;
  children?: TreeNode[];
}

export function buildTree(modules: { name: string; size: number }[]): TreeNode {
  const root: TreeNode = { name: "root", path: "", size: 0, children: [] };

  for (const module of modules) {
    const parts = module.name.replace(/^\.\//, "").split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const path = parts.slice(0, i + 1).join("/");
      const isLeaf = i === parts.length - 1;

      if (!current.children) {
        current.children = [];
      }

      let child = current.children.find((node) => node.name === part);
      if (!child) {
        child = { name: part, path, size: 0, children: isLeaf ? undefined : [] };
        current.children.push(child);
      }

      if (isLeaf) {
        child.size = module.size;
      }

      current = child;
    }
  }

  propagateSizes(root);
  return root;
}

function propagateSizes(node: TreeNode): number {
  if (!node.children || node.children.length === 0) {
    return node.size;
  }

  node.size = node.children.reduce((sum, child) => sum + propagateSizes(child), 0);
  return node.size;
}
