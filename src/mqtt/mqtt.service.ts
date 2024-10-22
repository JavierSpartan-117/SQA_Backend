import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  // Configuración del broker EMQX
  private readonly mqttUrl = 'mqtts://h1a827e4.ala.us-east-1.emqxsl.com:8883';
  private readonly mqttOptions = {
    username: 'javier.tema57791@gmail.com', // Reemplaza con tu usuario MQTT
    password: 'Hola1234', // Reemplaza con tu contraseña MQTT
    rejectUnauthorized: true, // Para desarrollo, en producción debería ser true
  };

  private readonly topicLedControl = 'control/led';

  onModuleInit() {
    this.connectToMqttBroker();
  }

  private connectToMqttBroker() {
    this.client = mqtt.connect(this.mqttUrl, this.mqttOptions);

    this.client.on('connect', () => {
      this.logger.log('Conectado al broker MQTT');
      this.client.subscribe('sensor/datos', (err) => {
        if (!err) {
          this.logger.log('Suscrito al tópico sensor/datos');
        } else {
          this.logger.error('Error al suscribirse al tópico: ', err);
        }
      });
    });

    this.client.on('error', (error) => {
      this.logger.error('Error de conexión MQTT: ', error);
      this.client.end();
    });

    this.client.on('reconnect', () => {
      this.logger.log('Reintentando conexión al broker MQTT...');
    });

    // this.client.on('message', (topic, message) => {
    //   this.logger.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
    //   const data = JSON.parse(message.toString());
    //   this.processSensorData(data);
    // });
  }

  // private processSensorData(data: any) {
  //   const { humedad, temperatura, humedadSuelo } = data;
  //   this.logger.log(
  //     `Humedad: ${humedad}, Temperatura: ${temperatura}, Humedad del Suelo: ${humedadSuelo}`,
  //   );

  //   // Aquí puedes integrar con tus servicios para guardar en la base de datos
  //   // Por ejemplo:
  //   // this.sensorDataService.saveData({ humedad, temperatura, humedadSuelo });
  // }

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
