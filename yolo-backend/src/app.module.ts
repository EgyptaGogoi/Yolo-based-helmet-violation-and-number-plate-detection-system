import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { DetectRiderModule } from './detect-rider/detect-rider.module';
import { DetectViolationModule } from './detect-violation/detect-violation.module';
import { OcrModule } from './ocr/ocr.module';
import { ImageProcessingModule } from './image-processing/image-processing.module';

@Module({
  imports: [
    UploadModule,
    DetectRiderModule,
    DetectViolationModule,
    OcrModule,
    ImageProcessingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
