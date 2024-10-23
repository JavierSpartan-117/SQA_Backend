import { Module } from '@nestjs/common';
import { MqttConnectionService } from './mqtt-connection.service';
import { MqttSubscriberService } from './mqtt-subscriber.service';
import { MqttPublisherService } from './mqtt-publisher.service';
import { SensorsWsModule } from 'src/sensors-ws/sensors-ws.module';

@Module({
  imports: [SensorsWsModule],
  providers: [
    MqttConnectionService,
    MqttSubscriberService,
    MqttPublisherService,
  ],
  exports: [MqttPublisherService], // Si otros módulos necesitan publicar mensajes
})
export class MqttModule {}
