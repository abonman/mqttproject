import { Injectable } from '@nestjs/common';
import { MessageObject } from './mqtt/mqtt.objectInterface';

@Injectable()
export class AppService {
  async setObject(message: string): Promise<MessageObject> {
    const tempArr = message.replace(/\*|\#/g, "").split(",")
    const messageObj: MessageObject = {
      "SCOR": tempArr[0],
      "OM": tempArr[1],
      "IMEI": parseInt(tempArr[2]),
      "INSTRUCTION": tempArr[3],
      "VOLTAGE": parseInt(tempArr[4]),
      "BATTERY LEVEL": parseInt(tempArr[5]),
      "NETWORK SIGNAL": {
        "current": parseInt(tempArr[6]),
        "Max": parseInt(tempArr[7]) | 35,
        "Min": parseInt(tempArr[8]) | 1
      }
    };
    return messageObj;
  }
}
