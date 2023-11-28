// sensor-solo.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorSoloEntity } from '../sensor/entities/sensor-solo.entity';
import { SensorSoloService } from './sensor-solo.service';
import { SensorSoloController } from './sensor-solo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SensorSoloEntity])],
  controllers: [SensorSoloController],
  providers: [SensorSoloService],
})
export class SensorSoloModule {}
