export enum LocalStorageKey{
  User_Info = 'user_info',
  System_Config='system_config'
}

export enum Role{
  User = 'User',
  Admin='Admin'
}

export enum Config{
  Server='http://127.0.0.1:8080',
}

//聊天指令
export enum Chat {
  Join = 'join',
  JoinOne='joinOne',
  Leave = 'leave',
  Message = 'message',
  Online='online'
}

//聊天类型
export enum MessageType {
  Chat = 'chat',
  ApplyFriend = 'applyfriend', //申请好友
  ApplyGroup = 'applygroup', //申请加群
  InviteCollaborator='invitecollaborator',//邀请协作者
  FriendInviteJoinGroup = 'friendInviteJoinGroup', //好友邀请加群
}
export enum State {
  Pending = 'pending',
  Agree = 'agree',
  Reject = 'reject',
}

//文件类型
export enum FileType {
  Folder = 'folder', //文件夹
  Text = 'text', //聊天文本或者文档
  Image = 'image',
}
