import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [SensorsModule],
  controllers: [AppController],
  providers: [AppService, MqttService],
})
export class AppModule {}
