import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async getHello(): Promise<any> {
    return 'Hello!';
  }
}
