import {LocalStorageKey } from '@/enum';

export function isLogin() {
  let user_info = null;
  try {
     user_info = JSON.parse(
      window.localStorage.getItem(LocalStorageKey.User_Info) as string
    );
  } catch (err) {
    return false;
  }
  return user_info?.jwt_token?true:false;
}
