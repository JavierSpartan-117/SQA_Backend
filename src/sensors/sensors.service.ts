import { BadRequestException, Injectable } from '@nestjs/common';
import { SensorControlDto } from './dto/sensor-control.dto';
import { MqttPublisherService } from 'src/mqtt/mqtt-publisher.service';
import { MqttSubscriberService } from 'src/mqtt/mqtt-subscriber.service';
import { WaterPumpDto } from './dto/water-pump.dto';

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
    const { nivelAgua, modoBomba } = this.mqttSubscriberService.sensorData;

    // Verificación de condiciones solo para la bomba de agua
    if (topic === this.topic_control_water_pump) {
      if (modoBomba !== 'manual') {
        throw new BadRequestException(
          'La bomba está en modo automático, por favor cámbiala al modo manual.',
        );
      } else if (nivelAgua !== 'Con agua') {
        throw new BadRequestException(
          'No se puede encender la bomba si no hay agua.',
        );
      }
    }

    this.mqttPublisherService.publishSensorControl(topic, state);

    return state === 'on'
      ? 'Encendiendo sensor'
      : state === 'off'
        ? 'Apagando sensor'
        : 'Acción desconocida';
  }

  async modeWaterPump(waterPumpDto: WaterPumpDto): Promise<string> {
    const { mode } = waterPumpDto;

    this.mqttPublisherService.publishModeBomb(
      this.topic_control_water_mode,
      mode,
    );

    return mode === 'auto'
      ? 'Modo automático activado'
      : mode === 'manual'
        ? 'Modo manual activado'
        : 'Acción desconocida';
  }
}
