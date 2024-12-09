import { Test, TestingModule } from '@nestjs/testing';
import { YoloController } from './yolo.controller';

describe('YoloController', () => {
  let controller: YoloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoloController],
    }).compile();

    controller = module.get<YoloController>(YoloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
