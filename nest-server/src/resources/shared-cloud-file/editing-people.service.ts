import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class EditingPeopleService {
  constructor(private readonly userService: UserService) {}

  private readonly documentRoom: { [documentId: string]: string[] } = {};

  //加入编辑
  public join(documentId: string, userId: string) {
    if (this.isEditing(documentId, userId)) {
      return false;
    }
    if (Array.isArray(this.documentRoom[documentId])) {
      this.documentRoom[documentId].push(userId);
    } else {
      this.documentRoom[documentId] = [userId];
    }
    return true;
  }

  //离开房间
  public leave(documentId: string, userId: string) {
    if (this.isEditing(documentId, userId)) {
      this.documentRoom[documentId] = this.documentRoom[documentId].filter(
        (id) => id !== userId,
      );
      return true;
    }
    return false;
  }

  //是否在房间
  public isEditing(documentId: string, userId: string) {
    return this.documentRoom[documentId]?.includes(userId) ?? false;
  }

  //获取房间人数
  public editingPeopleCount(documentId: string) {
    return this.documentRoom[documentId]?.length ?? 0;
  }

  //获取房间人员信息
  public async editingPeople(documentId: string) {
    if (!this.editingPeopleCount(documentId)) {
      return [];
    }
    return Promise.all(
      this.documentRoom[documentId]?.map(async (userId: string) => {
        const user = await this.userService.findOne(userId);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };
      }),
    );
  }
}
