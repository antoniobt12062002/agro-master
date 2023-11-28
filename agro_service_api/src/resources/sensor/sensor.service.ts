// sensor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from '../sensor/entities/sensor.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>,
  ) {}

  async saveSensorData(userId: string, sensorData: SensorData): Promise<SensorData> {
    // Adicione a lógica necessária antes de salvar os dados
    sensorData.user = { id: userId }; // Você pode ajustar isso conforme necessário
    return await this.sensorDataRepository.save(sensorData);
  }
}
