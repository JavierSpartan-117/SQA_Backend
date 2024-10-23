import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MqttConnectionService } from './mqtt-connection.service';
import mqtt from 'mqtt/*';
import { SensorsWsService } from 'src/sensors-ws/sensors-ws.service';
import { SensorsWsGateway } from 'src/sensors-ws/sensors-ws.gateway';

@Injectable()
export class MqttSubscriberService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttSubscriberService.name);
  private readonly topicSensorData = 'sensor/datos';

  constructor(
    private readonly mqttConnectionService: MqttConnectionService,
    private readonly sensorsWsGateway: SensorsWsGateway,
    private readonly sensorsWsService: SensorsWsService,
  ) {}

  onModuleInit() {
    this.client = this.mqttConnectionService.connect();
    this.subscribeToTopic(this.topicSensorData);
  }

  private subscribeToTopic(topic: string) {
    this.client.subscribe(topic, (err: any) => {
      if (!err) {
        this.logger.log(`Suscrito al tópico ${topic}`);
      } else {
        this.logger.error('Error al suscribirse al tópico: ', err);
      }
    });

    this.client.on('message', (topic, message) => {
      const messageString = message.toString();
      // this.logger.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
      try {
        // Manejar NaN en el mensaje
        const sanitizedMessage = messageString.replace(/nan/gi, 'null');
        // Parsear JSON
        const data = JSON.parse(sanitizedMessage);

        // this.processSensorData(data);
        this.sensorsWsGateway.sendSensorData(data);
      } catch (error) {
        this.logger.error('Error al procesar el mensaje JSON: ', error.message);
      }
    });
  }

  private processSensorData(data: any) {
    const { humedad, temperatura, humedadSuelo } = data;
    this.logger.log(
      `Humedad: ${humedad}, Temperatura: ${temperatura}, Humedad del Suelo: ${humedadSuelo}`,
    );

    // Aquí puedes integrar con tus servicios para guardar en la base de datos
    // Por ejemplo:
    // this.sensorService.saveSensorData(data);
  }
}
