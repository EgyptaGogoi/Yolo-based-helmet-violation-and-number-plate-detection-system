import { Test, TestingModule } from '@nestjs/testing';
import { CropRiderController } from './crop-rider.controller';

describe('CropRiderController', () => {
  let controller: CropRiderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropRiderController],
    }).compile();

    controller = module.get<CropRiderController>(CropRiderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
