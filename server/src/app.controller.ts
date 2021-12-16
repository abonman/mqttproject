import { Controller, Get, Inject } from '@nestjs/common';
import { ClientMqtt, MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SERVER')
    private readonly client: ClientMqtt
  ) { }

  @MessagePattern("device")
  async getPrinted(@Payload() data: any, @Ctx() context: MqttContext) {
    const message = await this.appService.setObject(data);
    const absoluteNetworkSignal = ((message['NETWORK SIGNAL'].current - message['NETWORK SIGNAL'].Min) * 100) / (message['NETWORK SIGNAL'].Max - message['NETWORK SIGNAL'].Min)
    console.log(`Imei: ${message.IMEI} Voltage ${(message.VOLTAGE / 100).toFixed(2)} Battery Level ${message['BATTERY LEVEL']}% Network Signal ${absoluteNetworkSignal.toFixed(1)}%`)
    let date = new Date();
    const ack = { date: date.toUTCString(), imei: message.IMEI, topic: `${context.getTopic()}`, taken: true }
    this.client.emit('_ACK', ack);
  }


}
