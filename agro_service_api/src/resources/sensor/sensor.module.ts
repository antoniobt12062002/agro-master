// sensor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { SensorData } from './entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorData])],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
