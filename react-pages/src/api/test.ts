import { request} from '../utils';

type User = {
  id: number;
  create_at: string;
}

export function fetchDemo(url:string){
  return request.get<User>(url);
}
