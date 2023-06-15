export enum State {
  Pending = 'pending',
  Agree = 'agree',
  Reject = 'reject',
}
export enum YesNotState {
  Yes = '1',
  Not = '0',
}
//权限标识
export enum Role {
  User = 'User',
  Admin = 'Admin',
}
//聊天指令
export enum Chat {
  Group_Join = 'group join',
  Group_Message = 'group message',
  Group_Leave = 'group leave',
  Private_Join = 'private join',
  Private_Leave = 'private leave',
}
//聊天内容
export enum Dialog {
  Text = 'text',
  Image = 'image',
}
