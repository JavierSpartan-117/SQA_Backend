import { IsEnum, IsNotEmpty } from 'class-validator';
import { SensorControl } from '../enums/sensor-control.enum';
import { Topic } from '../enums/topic.enum';

export class SensorControlDto {
  @IsEnum(Topic)
  @IsNotEmpty()
  topic: Topic;

  @IsEnum(SensorControl)
  @IsNotEmpty()
  state: SensorControl;
}
