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
    
    try {
      // Ajuste a string para um formato JSON válido
      const adjustedData = `[${data}]`;
      
      // Parse os dados recebidos do MQTT para um array
      const sensorData = JSON.parse(adjustedData);


      const temperatura = Number(sensorData[0]) / 10;
      const umidade = Number(sensorData[1] / 10);
      const ph = Number(sensorData[2]) / 10;
      const nitrogenio = Number(sensorData[3]/ 10);
      const fosforo = Number(sensorData[4]/ 10);
      const potassio = Number(sensorData[5]/ 10);

      console.log('Parsed MQTT data:', temperatura, umidade, ph, nitrogenio, fosforo, potassio);

      // Crie uma nova instância da entidade SensorSoloEntity
      const newSensorData = this.sensorSoloRepository.create({
        temperatura,
        umidade,
        ph,
        nitrogenio,
        fosforo,
        potassio,
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
