export enum LocalStorageKey{
  User_Info='user_info',
}

export enum Role{
  User = 'User',
  Admin='Admin'
}

export enum Config{
  ServerUrl='http://localhost:8080',
  WsUrl = 'http://localhost:8080',
}

export enum Chat {
  Group_Join = 'group join',
  Group_Message = 'group message',
  Group_Leave = 'group leave',
  Private_Chat = 'private chat',
}

export enum State {
  Pending = 'pending',
  Agree = 'agree',
  Reject = 'reject',
}