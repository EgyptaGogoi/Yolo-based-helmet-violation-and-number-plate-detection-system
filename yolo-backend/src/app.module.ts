import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { DetectRiderModule } from './detect-rider/detect-rider.module';
import { CropRiderModule } from './crop-rider/crop-rider.module';
import { DetectViolationModule } from './detect-violation/detect-violation.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [
    UploadModule,
    DetectRiderModule,
    CropRiderModule,
    DetectViolationModule,
    OcrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
