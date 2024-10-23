import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttConnectionService } from './mqtt-connection.service';

@Injectable()
export class MqttPublisherService {
  private readonly logger = new Logger(MqttPublisherService.name);
  private client: mqtt.MqttClient;

  private readonly topicLedControl = 'control/led';

  constructor(private readonly mqttConnectService: MqttConnectionService) {
    this.client = this.mqttConnectService.connect();
  }

  public publishLedControl(state: string) {
    this.client.publish(this.topicLedControl, state, (err) => {
      if (err) {
        this.logger.error('Error al publicar mensaje: ', err);
      } else {
        this.logger.log(`Publicando mensaje: ${state}`);
      }
    });
  }
}
