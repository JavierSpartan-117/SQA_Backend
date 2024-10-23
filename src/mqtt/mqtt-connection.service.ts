import { Injectable, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttConnectionService {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttConnectionService.name);

  private readonly mqttUrl = 'mqtts://h1a827e4.ala.us-east-1.emqxsl.com:8883';
  private readonly mqttOptions = {
    username: 'javier.tema57791@gmail.com',
    password: 'Hola1234',
    rejectUnauthorized: true,
  };

  connect(): mqtt.MqttClient {
    this.client = mqtt.connect(this.mqttUrl, this.mqttOptions);

    this.client.on('connect', () => {
      this.logger.log('Conectado al broker MQTT');
    });

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
