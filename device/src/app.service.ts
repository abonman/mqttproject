import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async reflect(): Promise<string> {
    let date = new Date();
    return date.getDate().toString();
  }
}
