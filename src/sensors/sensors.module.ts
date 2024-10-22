import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { MqttService } from 'src/mqtt/mqtt.service';

@Module({
  controllers: [SensorsController],
  providers: [SensorsService, MqttService],
})
export class SensorsModule {}
