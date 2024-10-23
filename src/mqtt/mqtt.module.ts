import { Module } from '@nestjs/common';
import { MqttConnectionService } from './mqtt-connection.service';
import { MqttSubscriberService } from './mqtt-subscriber.service';
import { MqttPublisherService } from './mqtt-publisher.service';

@Module({
  providers: [
    MqttConnectionService,
    MqttSubscriberService,
    MqttPublisherService,
  ],
  exports: [MqttPublisherService], // Si otros módulos necesitan publicar mensajes
})
export class MqttModule {}
