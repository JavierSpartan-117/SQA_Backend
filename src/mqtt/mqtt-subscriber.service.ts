import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MqttConnectionService } from './mqtt-connection.service';
import mqtt from 'mqtt/*';
import { SensorsWsService } from 'src/sensors-ws/sensors-ws.service';
import { SensorsWsGateway } from 'src/sensors-ws/sensors-ws.gateway';

@Injectable()
export class MqttSubscriberService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttSubscriberService.name);
  private readonly topic_humidity_soil = 'sensors/humidity-soil';
  private readonly topic_humidity_temperature = 'sensors/humidity-temperature';
  private readonly topic_water_level = 'sensors/water-level';
  private readonly topic_water_mode = 'water-mode';

  constructor(
    private readonly mqttConnectionService: MqttConnectionService,
    private readonly sensorsWsGateway: SensorsWsGateway,
    private readonly sensorsWsService: SensorsWsService,
  ) {}

  // Objeto para acumular los datos de los sensores
  public sensorData = {
    humedadSuelo: null,
    humedad: null,
    temperatura: null,
    nivelAgua: null,
    modoBomba: null,
  };

  private readonly sendInterval = 1000; // Intervalo en ms para enviar datos al frontend
  private intervalHandle: NodeJS.Timeout;

  onModuleInit() {
    this.client = this.mqttConnectionService.connect();
    this.subscribeToTopic(this.topic_humidity_soil);
    this.subscribeToTopic(this.topic_humidity_temperature);
    this.subscribeToTopic(this.topic_water_level);
    this.subscribeToTopic(this.topic_water_mode);

    // Configurar el envío de datos al frontend cada cierto tiempo
    this.intervalHandle = setInterval(() => {
      this.sendDataToFrontend();
    }, this.sendInterval);
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
      try {
        const data = JSON.parse(messageString);

        // Almacenar los datos en el objeto acumulador
        this.updateSensorData(topic, data);
      } catch (error) {
        this.logger.error('Error al procesar el mensaje JSON: ', error.message);
      }
    });
  }

  private updateSensorData(topic: string, data: any) {
    switch (topic) {
      case this.topic_humidity_soil:
        this.sensorData.humedadSuelo = data.humedadSuelo;
        break;
      case this.topic_humidity_temperature:
        this.sensorData.humedad = data.humedad;
        this.sensorData.temperatura = data.temperatura;
        break;
      case this.topic_water_level:
        this.sensorData.nivelAgua = data.nivelAgua;
        break;
      case this.topic_water_mode:
        this.sensorData.modoBomba = data.modoBomba;
        break;
    }
  }

  // Enviar los datos al frontend solo si todos están presentes
  private sendDataToFrontend() {
    const { humedadSuelo, humedad, temperatura, nivelAgua, modoBomba } =
      this.sensorData;
    if (
      humedadSuelo !== null &&
      humedad !== null &&
      temperatura !== null &&
      nivelAgua !== null &&
      modoBomba !== null
    ) {
      this.sensorsWsGateway.sendSensorData(this.sensorData);
      // this.logger.log(
      //   `Enviando datos al frontend: ${JSON.stringify(this.sensorData)}`,
      // );

      // Opcional: Limpiar los datos después de enviar
      this.resetSensorData();
    }
  }

  private resetSensorData() {
    this.sensorData = {
      humedadSuelo: null,
      humedad: null,
      temperatura: null,
      nivelAgua: null,
      modoBomba: null,
    };
  }

  // Aquí puedes integrar con tus servicios para guardar en la base de datos
  // Por ejemplo:
  // this.sensorService.saveSensorData(data);
}
