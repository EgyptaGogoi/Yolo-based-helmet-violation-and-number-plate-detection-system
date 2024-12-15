import { Body, Controller, Get, Post } from '@nestjs/common';
import { DetectRiderService } from './detect-rider.service';

@Controller('detect-rider')
export class DetectRiderController {
  
  constructor(private readonly detectRiderService: DetectRiderService ) {}

  @Post('/')
  detect_rider(@Body('img') img: string) {
      return this.detectRiderService.detect_rider(img);
    }
}
