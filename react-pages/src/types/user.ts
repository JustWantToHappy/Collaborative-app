export type User = {
  id:number,
  name: string;
  email: string;
  password: string;
  avatar: string;
  jwt_token?: string;
}