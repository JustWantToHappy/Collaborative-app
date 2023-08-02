export type Friend = {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export type TreeNode = {
  key: string;
  value: string;
  title: string;
  children?: TreeNode[];
}