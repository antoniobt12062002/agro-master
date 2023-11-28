// sensor.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorData } from './entities/sensor.entity';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post('data')
  saveSensorData(@Req() req, @Body() sensorData: SensorData) {
    const userId = req.user.id; // Assumindo que você está usando autenticação para obter o ID do usuário
    return this.sensorService.saveSensorData(userId, sensorData);
  }
}
