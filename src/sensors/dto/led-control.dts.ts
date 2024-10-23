import { IsEnum, IsNotEmpty } from 'class-validator';
import { LedControl } from '../enums/led-control.enum';

export class LedControlDto {
  @IsEnum(LedControl)
  @IsNotEmpty()
  state: LedControl;
}
