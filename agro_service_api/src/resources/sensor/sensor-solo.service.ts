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

  async saveSensorDataFromMqtt(data: string) {
    console.log('Received MQTT data:', data);

    try {
      // Ajuste a string para um formato JSON válido
      const adjustedData = `[${data}]`;

      // Parse os dados recebidos do MQTT para um array
      const sensorData = JSON.parse(adjustedData);

      // Crie uma nova instância da entidade SensorSoloEntity
      const newSensorData = this.sensorSoloRepository.create({
        temperatura: parseFloat(sensorData[0]),
        umidade: parseFloat(sensorData[1]),
        condutividade: parseFloat(sensorData[2]),
        ph: parseFloat(sensorData[3]),
        nitrogenio: parseFloat(sensorData[4]),
        fosforo: parseFloat(sensorData[5]),
        potassio: parseFloat(sensorData[6]),
      });

      // Salve os dados no banco de dados
      const savedData = await this.sensorSoloRepository.save(newSensorData);

      return savedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllSensorData() {
    try {
      // Recupera todos os dados do banco de dados
      const sensorData = await this.sensorSoloRepository.find();
      return sensorData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
