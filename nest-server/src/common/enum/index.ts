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
  InviteCollaborator = 'invitecollaborator', //邀请协作者
  FriendInviteJoinGroup = 'friendInviteJoinGroup', //好友邀请加群
}
//权限标识
export enum Role {
  User = 'User',
  Admin = 'Admin',
}
//聊天指令
export enum Chat {
  Join = 'join',
  JoinOne = 'joinOne',
  Leave = 'leave',
  Message = 'message',
}
//文件类型
export enum FileType {
  Folder = 'folder', //文件夹
  Text = 'text', //聊天文本或者文档
  Image = 'image',
}
