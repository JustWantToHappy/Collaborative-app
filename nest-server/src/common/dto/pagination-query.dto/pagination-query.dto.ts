import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  /**
   * 为什么这里要将类型进行转换之后变为Number类型?
   * 这是因为传过来时是字符串
   */
  @Type(() => Number)
  @IsOptional() //标记类型是否可选
  current: number;

  @Type(() => Number)
  @IsOptional()
  pagesize: number;
}
