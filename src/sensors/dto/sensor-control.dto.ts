import { IsEnum, IsNotEmpty } from 'class-validator';
import { SensorControl } from '../enums/sensor-control.enum';
import { TopicSensor } from '../enums/topic-sensor.enum';

export class SensorControlDto {
  @IsEnum(TopicSensor)
  @IsNotEmpty()
  topic: TopicSensor;

  @IsEnum(SensorControl)
  @IsNotEmpty()
  state: SensorControl;
}
