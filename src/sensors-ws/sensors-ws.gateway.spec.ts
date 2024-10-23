import { Test, TestingModule } from '@nestjs/testing';
import { SensorsWsGateway } from './sensors-ws.gateway';
import { SensorsWsService } from './sensors-ws.service';

describe('SensorsWsGateway', () => {
  let gateway: SensorsWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsWsGateway, SensorsWsService],
    }).compile();

    gateway = module.get<SensorsWsGateway>(SensorsWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
