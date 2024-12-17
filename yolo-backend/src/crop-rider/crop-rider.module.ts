import { Module } from '@nestjs/common';
import { CropRiderService } from './crop-rider.service';
import { CropRiderController } from './crop-rider.controller';

@Module({
  providers: [CropRiderService],
  controllers: [CropRiderController]
})
export class CropRiderModule {}
