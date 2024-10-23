import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsModule } from './sensors/sensors.module';
import { MqttConnectionService } from './mqtt/mqtt-connection.service';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttPublisherService } from './mqtt/mqtt-publisher.service';
import { MqttSubscriberService } from './mqtt/mqtt-subscriber.service';

@Module({
  imports: [SensorsModule, MqttModule],
  controllers: [AppController],
  providers: [
    AppService,
    MqttConnectionService,
    MqttPublisherService,
    MqttSubscriberService,
  ],
})
export class AppModule {}
