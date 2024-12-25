import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { DetectRiderModule } from './detect-rider/detect-rider.module';
import { DetectViolationModule } from './detect-violation/detect-violation.module';
import { ImageProcessingModule } from './image-processing/image-processing.module';
import { DriverModule } from './driver/driver.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UploadModule,
    DetectRiderModule,
    DetectViolationModule,
    ImageProcessingModule,
    DriverModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'croped-Image'), // This should be the relative path to the directory
      serveRoot: '/images', // The route prefix for serving the files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
