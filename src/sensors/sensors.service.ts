import { Injectable } from '@nestjs/common';
import { LedControlDto } from './dto/led-control.dts';
import { MqttPublisherService } from 'src/mqtt/mqtt-publisher.service';

@Injectable()
export class SensorsService {
  constructor(private readonly mqttPublisherService: MqttPublisherService) {}

  create(ledControlDto: LedControlDto): string {
    if (ledControlDto.state === 'on' || ledControlDto.state === 'off') {
      this.mqttPublisherService.publishLedControl(ledControlDto.state);
      return 'Encendiendo el LED';
    } else {
      return 'Apagando el LED';
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
