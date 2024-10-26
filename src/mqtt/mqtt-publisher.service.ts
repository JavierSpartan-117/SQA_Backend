import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttConnectionService } from './mqtt-connection.service';

@Injectable()
export class MqttPublisherService {
  private readonly logger = new Logger(MqttPublisherService.name);
  private client: mqtt.MqttClient;

  constructor(private readonly mqttConnectService: MqttConnectionService) {
    this.client = this.mqttConnectService.connect();
  }

  public publishSensorControl(topic: string, state: string) {
    this.client.publish(topic, state, (err) => {
      if (err) {
        this.logger.error('Error al publicar mensaje: ', err);
      } else {
        this.logger.log(`Publicando mensaje: ${state}`);
      }
    });
  }

  public publishModeBomb(topic: string, mode: string) {
    this.client.publish(topic, mode, (err) => {
      if (err) {
        this.logger.error('Error al publicar mensaje: ', err);
      } else {
        this.logger.log(`Publicando mensaje: ${mode}`);
      }
    });
  }
}
