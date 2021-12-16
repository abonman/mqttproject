import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'SERVER',
      transport: Transport.MQTT,
      options: {
        url: process.env.BROKER,
      }
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
