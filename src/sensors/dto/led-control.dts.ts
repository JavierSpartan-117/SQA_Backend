import { IsNotEmpty, IsString } from 'class-validator';

export class LedControlDto {
  @IsString()
  @IsNotEmpty()
  state: string;
}
