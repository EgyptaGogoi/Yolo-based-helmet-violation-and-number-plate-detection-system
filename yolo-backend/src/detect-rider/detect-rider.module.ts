import { Module } from '@nestjs/common';
import { DetectRiderController } from './detect-rider.controller';
import { DetectRiderService } from './detect-rider.service';

@Module({
  controllers: [DetectRiderController],
  providers: [DetectRiderService]
})
export class DetectRiderModule {}
