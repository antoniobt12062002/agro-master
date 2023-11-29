// app.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { SensorSoloService } from '../sensor/sensor-solo.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('TESTE_CLIENT') private client: ClientProxy,
    private readonly sensorSoloService: SensorSoloService, // Certifique-se de usar readonly
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleSendDataService(payload: string) {
    // Chama o serviço SensorSolo para salvar os dados do MQTT no banco de dados
    await this.sensorSoloService.saveSensorDataFromMqtt(payload);

    // Envia os dados para o tópico MQTT de saída
    const record = new MqttRecordBuilder(payload).setQoS(2).build();

    this.client
      .send(process.env.OUTPUT_TOPIC_CLIENT, record)
      .subscribe(async (res) => {
        console.log(res);
      });
  }
}
