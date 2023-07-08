import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  port: 8080,
  namespace: '/shared',
  cors: { origin: /.*/ },
})
export class SharedCloudFileGateway {
  //获取正在编辑文档的用户
  @SubscribeMessage('online')
  handleOnline(client: any, payload: any): string {
    console.info('jieshoudaol1');
    return 'Hello world!';
  }
}
