import { BadRequestException, Injectable } from '@nestjs/common';
import { SensorControlDto } from './dto/sensor-control.dto';
import { MqttPublisherService } from 'src/mqtt/mqtt-publisher.service';
import { MqttSubscriberService } from 'src/mqtt/mqtt-subscriber.service';

@Injectable()
export class SensorsService {
  constructor(
    private readonly mqttPublisherService: MqttPublisherService,
    private readonly mqttSubscriberService: MqttSubscriberService,
  ) {}

  private readonly topic_control_humidity_soil = 'control/humidity-soil';
  private readonly topic_control_humidity_temperature =
    'control/humidity-temperature';
  private readonly topic_control_water_pump = 'control/water-pump';
  private readonly topic_control_water_mode = 'control/water-mode';

  create(sensorControlDto: SensorControlDto): string {
    const { topic, state } = sensorControlDto;

    // Verificación antes de encender la bomba de agua
    if (
      topic === this.topic_control_water_pump &&
      (state === 'on' || state === 'off')
    ) {
      const { nivelAgua, modoBomba } = this.mqttSubscriberService.sensorData;

      if (nivelAgua !== 'Con agua' || modoBomba !== 'manual') {
        throw new BadRequestException(
          'La bomba esta en modo automatico, por favor cambialo al modo manual.',
        );
      }
    }

    // Publicar comando MQTT para encender/apagar el sensor o actuador
    this.mqttPublisherService.publishSensorControl(topic, state);

    return state === 'on'
      ? 'Encendiendo sensor'
      : state === 'off'
        ? 'Apagando sensor'
        : 'ya mamo';
  }
}
