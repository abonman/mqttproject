import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DEVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.BROKER,
          subscribeOptions: {
            qos: 1,
          },
        },
      },
    ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
