import { Test, TestingModule } from '@nestjs/testing';
import { SensorsWsService } from './sensors-ws.service';

describe('SensorsWsService', () => {
  let service: SensorsWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsWsService],
    }).compile();

    service = module.get<SensorsWsService>(SensorsWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
