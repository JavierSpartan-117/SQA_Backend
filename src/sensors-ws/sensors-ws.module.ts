import { Module } from '@nestjs/common';
import { SensorsWsService } from './sensors-ws.service';
import { SensorsWsGateway } from './sensors-ws.gateway';

@Module({
  providers: [SensorsWsGateway, SensorsWsService],
  exports: [SensorsWsService, SensorsWsGateway],
})
export class SensorsWsModule {}
