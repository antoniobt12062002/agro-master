// sensor-solo.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { SensorSoloService } from './sensor-solo.service';
import { SensorSoloEntity } from '../sensor/entities/sensor-solo.entity';

@Controller('sensor-solo')
export class SensorSoloController {
  constructor(private readonly sensorSoloService: SensorSoloService) {}

  @Post('/save-data-from-mqtt')
  saveSensorDataFromMqtt(@Body() body: { data: string }) {
    return this.sensorSoloService.saveSensorDataFromMqtt(body.data);
  }

  @Get('/get-all-data')
  getAllSensorData() {
    return this.sensorSoloService.getAllSensorData();
  }
}
