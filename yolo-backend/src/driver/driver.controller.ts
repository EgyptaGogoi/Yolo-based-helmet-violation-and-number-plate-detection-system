import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {

    constructor(private readonly driverService: DriverService){}

    @Post('byUrl')
    detectByUrl(@Body('img') img: string){
        return this.driverService.driverWithUrl(img)
        // return "Hello world"
    }

    @Get('/numberplate')
    getNumberPlate(@Body('imgPath') imgPath: string, @Body('boundingBox') boudingBox: any[]){
        return this.driverService.getNumberPlate(imgPath, boudingBox);
    }

}
