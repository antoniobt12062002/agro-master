// sensor-solo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorSoloEntity } from './entities/sensor-solo.entity';
import { SensorSoloService } from './sensor-solo.service';
import { SensorSoloController } from './sensor-solo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SensorSoloEntity])],
  controllers: [SensorSoloController],
  providers: [SensorSoloService],
  exports: [SensorSoloService], // Exporta o SensorSoloService para que ele possa ser injetado em outros módulos
})
export class SensorSoloModule {}
