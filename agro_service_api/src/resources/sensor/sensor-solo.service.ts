// sensor-solo.service.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorSoloEntity } from '../sensor/entities/sensor-solo.entity';

@Injectable()
export class SensorSoloService {
  constructor(
    @InjectRepository(SensorSoloEntity)
    private sensorSoloRepository: Repository<SensorSoloEntity>,
  ) {}

  async saveSensorData(sensorData: SensorSoloEntity) {
    try {
      const savedData = await this.sensorSoloRepository.save(sensorData);
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
