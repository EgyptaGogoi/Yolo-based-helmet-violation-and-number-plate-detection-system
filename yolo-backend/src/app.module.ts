import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoloModule } from './yolo/yolo.module';

@Module({
  imports: [YoloModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
