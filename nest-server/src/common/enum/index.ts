export enum State {
  Pending = 'pending',
  Agree = 'agree',
  Reject = 'reject',
}
export enum ChatRoomType {
  Private = 'private',
  Public = 'public',
}
//聊天类型
export enum MessageType {
  Chat = 'chat',
  ApplyFriend = 'applyfriend', //申请好友
  ApplyGroup = 'applygroup', //申请加群
  FriendInviteJoinGroup = 'friendInviteJoinGroup', //好友邀请加群
  GroupInvite = 'groupInvite', //群申请
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
//聊天类型
export enum FileType {
  Text = 'text',
  Image = 'image',
}
