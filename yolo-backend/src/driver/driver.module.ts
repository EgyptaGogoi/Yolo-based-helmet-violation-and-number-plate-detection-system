import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { UploadService } from 'src/upload/upload.service';
import { DetectRiderService } from 'src/detect-rider/detect-rider.service';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';
import { DetectViolationService } from 'src/detect-violation/detect-violation.service';

@Module({
  providers: [DriverService,UploadService, DetectRiderService, ImageProcessingService, DetectViolationService],
  controllers: [DriverController]
})
export class DriverModule {}
