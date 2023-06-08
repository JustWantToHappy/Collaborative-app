export type Message = {
  content: string;
};

export type InviteUserJoinGroup = {
  leader_id: number;
  user_id: number;
  team_id: number;
};
