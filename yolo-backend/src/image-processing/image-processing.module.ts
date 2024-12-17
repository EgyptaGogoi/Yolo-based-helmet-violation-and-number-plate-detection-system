import { Module } from '@nestjs/common';
import { ImageProcessingController } from './image-processing.controller';
import { ImageProcessingService } from './image-processing.service';
import { DetectViolationService } from 'src/detect-violation/detect-violation.service';

@Module({
  controllers: [ImageProcessingController],
  providers: [ImageProcessingService, DetectViolationService]
})
export class ImageProcessingModule {}
