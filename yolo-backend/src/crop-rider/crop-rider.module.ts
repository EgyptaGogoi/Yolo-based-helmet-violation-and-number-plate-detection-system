import { Module } from '@nestjs/common';
import { CropRiderService } from './crop-rider.service';

@Module({
  providers: [CropRiderService]
})
export class CropRiderModule {}
