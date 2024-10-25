import { IsEnum, IsNotEmpty } from 'class-validator';
import { TopicSensor } from '../enums/topic-sensor.enum';
export class TopicDto {
  @IsEnum(TopicSensor)
  @IsNotEmpty()
  topic: TopicSensor;
}
