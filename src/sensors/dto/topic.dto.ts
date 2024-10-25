import { IsEnum, IsNotEmpty } from 'class-validator';
import { Topic } from '../enums/topic.enum';

export class TopicDto {
  @IsEnum(Topic)
  @IsNotEmpty()
  topic: Topic;
}
