import { Test, TestingModule } from '@nestjs/testing';
import { DetectRiderController } from './detect-rider.controller';

describe('DetectRiderController', () => {
  let controller: DetectRiderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetectRiderController],
    }).compile();

    controller = module.get<DetectRiderController>(DetectRiderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
