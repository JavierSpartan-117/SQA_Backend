import { Injectable } from '@nestjs/common';
import { SensorControlDto } from './dto/sensor-control.dto';
import { MqttPublisherService } from 'src/mqtt/mqtt-publisher.service';

@Injectable()
export class SensorsService {
  constructor(private readonly mqttPublisherService: MqttPublisherService) {}

  private readonly topic_control_humidity_soil = 'control/humidity-soil';
  private readonly topic_control_humidity_temperature =
    'control/humidity-temperature';
  private readonly topic_control_water_pump = 'control/water-pump';
  private readonly topic_control_water_mode = 'control/water-mode';

  create(sensorControlDto: SensorControlDto): string {
    if (sensorControlDto.state === 'on') {
      this.mqttPublisherService.publishSensorControl(
        sensorControlDto.topic,
        sensorControlDto.state,
      );
      return 'Encendiendo sensor';
    } else if (sensorControlDto.state === 'off') {
      this.mqttPublisherService.publishSensorControl(
        sensorControlDto.topic,
        sensorControlDto.state,
      );
      return 'Apagando sensor';
    }
  }

  findAll() {
    return `This action returns all sensors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensor`;
  }

  // update(id: number, updateSensorDto: UpdateSensorDto) {
  //   return `This action updates a #${id} sensor`;
  // }

  remove(id: number) {
    return `This action removes a #${id} sensor`;
  }
}
