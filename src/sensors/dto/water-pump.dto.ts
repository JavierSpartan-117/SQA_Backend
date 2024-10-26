import { IsEnum, IsNotEmpty } from 'class-validator';
import { WaterPumpMode } from '../enums/water-pump-mode.enum';

export class WaterPumpDto {
  @IsEnum(WaterPumpMode)
  @IsNotEmpty()
  mode: WaterPumpMode;
}
