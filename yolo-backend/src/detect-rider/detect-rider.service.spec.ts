import { Test, TestingModule } from '@nestjs/testing';
import { DetectRiderService } from './detect-rider.service';

describe('DetectRiderService', () => {
  let service: DetectRiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetectRiderService],
    }).compile();

    service = module.get<DetectRiderService>(DetectRiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
