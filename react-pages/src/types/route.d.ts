export type Router = {
  name: string;
  path: string;
  element: React.ReactNode;
  children?:Array<Router>
}