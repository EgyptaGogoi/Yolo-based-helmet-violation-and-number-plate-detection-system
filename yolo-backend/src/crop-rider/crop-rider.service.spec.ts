import { Test, TestingModule } from '@nestjs/testing';
import { CropRiderService } from './crop-rider.service';

describe('CropRiderService', () => {
  let service: CropRiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CropRiderService],
    }).compile();

    service = module.get<CropRiderService>(CropRiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
