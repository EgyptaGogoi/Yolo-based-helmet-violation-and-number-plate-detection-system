import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoloModule } from './yolo/yolo.module';
import { ConfigModule } from '@nestjs/config';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [
    YoloModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env']
    }),
    OcrModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
