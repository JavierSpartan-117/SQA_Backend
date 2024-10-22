import { Injectable } from '@nestjs/common';
import { LedControlDto } from './dto/led-control.dts';
import { MqttService } from 'src/mqtt/mqtt.service';
// import { CreateSensorDto } from './dto/create-sensor.dto';
// import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(private readonly mqttService: MqttService) {}

  create(ledControlDto: LedControlDto): string {
    if (ledControlDto.state === 'on') {
      this.mqttService.publishLedControl(ledControlDto.state);
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
