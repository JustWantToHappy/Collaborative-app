import { Base } from 'src/common/base/base.entity';
import { YesNotState } from 'src/common/enum';
import { Column } from 'typeorm';

export class Conversation extends Base {
  //0表示群聊，1表示私聊
  @Column({ type: 'int', default: YesNotState.Not })
  type: YesNotState;
  //0表示未读，1表示已读
  @Column({ type: 'int', default: YesNotState.Not })
  isread: YesNotState;
}
