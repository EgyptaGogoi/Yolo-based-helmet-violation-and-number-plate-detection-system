import { Module } from '@nestjs/common';
import { DetectRiderController } from './detect-rider.controller';
import { DetectRiderService } from './detect-rider.service';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';

@Module({
  controllers: [DetectRiderController],
  providers: [DetectRiderService, ImageProcessingService]
})
export class DetectRiderModule {}
