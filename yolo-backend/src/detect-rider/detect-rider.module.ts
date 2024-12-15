import { Module } from '@nestjs/common';
import { DetectRiderController } from './detect-rider.controller';
import { DetectRiderService } from './detect-rider.service';
import { CropRiderService } from 'src/crop-rider/crop-rider.service';

@Module({
  controllers: [DetectRiderController],
  providers: [DetectRiderService, CropRiderService]
})
export class DetectRiderModule {}
