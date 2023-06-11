import { Base } from 'src/common/base/base.entity';
import { YesNotState } from 'src/common/enum';
import { Column } from 'typeorm';

export class Conversation extends Base {
  //0表示群聊
  @Column({ type: 'int', default: YesNotState.Not })
  type: YesNotState;
  //0表示未读
  @Column({ type: 'int', default: YesNotState.Not })
  isread: YesNotState;
}