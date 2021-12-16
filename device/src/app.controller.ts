import { Controller, Get, Inject } from '@nestjs/common';
import { ClientMqtt, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Ack } from './mqtt/mqtt.ackInterface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DEVICE')
    protected readonly client: ClientMqtt
  ) {
    this.client.connect()
  }

  async sendMsg(): Promise<string> {
    const record = new MqttRecordBuilder()
      .setData('*SCOR,OM,123456789123456,Q0,412,80,28#')
      .setQoS(1)
      .build();
    this.client.send('device', record).subscribe();
    return await this.appService.reflect();
  }

  @MessagePattern('_ACK')
  async getPrinted(@Payload() data: Ack, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log(data);
  }

  public msg = setInterval(() => {
    this.sendMsg()
  }, 5000);
}
