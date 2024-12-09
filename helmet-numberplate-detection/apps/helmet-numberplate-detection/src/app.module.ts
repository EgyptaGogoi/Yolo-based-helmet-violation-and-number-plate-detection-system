import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoloModule } from './yolo/yolo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    YoloModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env']
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
