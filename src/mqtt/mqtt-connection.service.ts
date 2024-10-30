import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttConnectionService {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttConnectionService.name);

  private readonly mqttUrl = process.env.MQTT_URL;
  private readonly mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    rejectUnauthorized: true,
  };

  connect(): mqtt.MqttClient {
    if (!this.client) {
      this.client = mqtt.connect(this.mqttUrl, this.mqttOptions);

      this.client.on('connect', () => {
        this.logger.log('Conectado al broker MQTT');
      });
    }

    this.client.on('error', (error) => {
      this.logger.error('Error de conexión MQTT: ', error);
      this.client.end();
    });

    this.client.on('reconnect', () => {
      this.logger.log('Reintentando conexión al broker MQTT...');
    });

    return this.client;
  }
}
