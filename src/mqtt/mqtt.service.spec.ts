import { Test, TestingModule } from '@nestjs/testing';
import { MqttConnectionService } from './mqtt-connection.service';

describe('MqttService', () => {
  let service: MqttConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttConnectionService],
    }).compile();

    service = module.get<MqttConnectionService>(MqttConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
