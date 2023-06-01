import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  //value表示当前路由接收之前的参数，metadata表示的是value的元属性
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed."${val}" is not an integer`,
      );
    }
    return value;
  }
}
