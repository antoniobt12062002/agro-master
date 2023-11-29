// sensor-solo.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorSoloEntity } from '../sensor/entities/sensor-solo.entity';

@Injectable()
export class SensorSoloService {
  constructor(
    @InjectRepository(SensorSoloEntity)
    private sensorSoloRepository: Repository<SensorSoloEntity>,
  ) {}

  async saveSensorDataFromMqtt(dataString: string) {
    try {
      const [temperatura, umidade, condutividade, ph, nitrogenio, fosforo, potassio] = dataString.split(',');

      const entityData: SensorSoloEntity = this.sensorSoloRepository.create({
        temperatura: parseFloat(temperatura),
        umidade: parseFloat(umidade),
        condutividade: parseFloat(condutividade),
        ph: parseFloat(ph),
        nitrogenio: parseFloat(nitrogenio),
        fosforo: parseFloat(fosforo),
        potassio: parseFloat(potassio),
        dataChegada: new Date(),
      });

      const savedData = await this.sensorSoloRepository.save(entityData);
      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSensorData() {
    try {
      const sensorData = await this.sensorSoloRepository.find();
      return sensorData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
