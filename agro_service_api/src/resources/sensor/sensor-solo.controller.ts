// sensor-solo.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { SensorSoloService } from './sensor-solo.service';
import { SensorSoloEntity } from '../sensor/entities/sensor-solo.entity';

@Controller('sensor-solo')
export class SensorSoloController {
  constructor(private readonly sensorSoloService: SensorSoloService) {}

  @Post('/save-data')
  saveSensorData(@Body() sensorData: SensorSoloEntity) {
    return this.sensorSoloService.saveSensorData(sensorData);
  }

  @Get('/get-all-data')
  getAllSensorData() {
    return this.sensorSoloService.getAllSensorData();
  }
}
