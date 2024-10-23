import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsModule } from './sensors/sensors.module';
import { MqttConnectionService } from './mqtt/mqtt-connection.service';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttPublisherService } from './mqtt/mqtt-publisher.service';
import { MqttSubscriberService } from './mqtt/mqtt-subscriber.service';
import { SensorsWsModule } from './sensors-ws/sensors-ws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), SensorsModule, MqttModule, SensorsWsModule],
  controllers: [AppController],
  providers: [
    AppService,
    MqttConnectionService,
    MqttPublisherService,
    MqttSubscriberService,
  ],
})
export class AppModule {}
