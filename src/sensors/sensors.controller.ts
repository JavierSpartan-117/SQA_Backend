import { Controller, Post, Body } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorControlDto } from './dto/sensor-control.dto';
import { WaterPumpDto } from './dto/water-pump.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post('control')
  create(@Body() sensorControlDto: SensorControlDto) {
    return this.sensorsService.create(sensorControlDto);
  }

  @Post('water-pump')
  modeWaterPump(@Body() waterPumpDto: WaterPumpDto) {
    return this.sensorsService.modeWaterPump(waterPumpDto);
  }
}
