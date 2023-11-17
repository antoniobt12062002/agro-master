import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('TESTE_CLIENT') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleSendDataService(payload: string) {
    const record = new MqttRecordBuilder(payload).setQoS(2).build();

    this.client
      .send(process.env.OUTPUT_TOPIC_CLIENT, record)
      .subscribe(async (res) => {
        console.log(res);
      });
  }
}
