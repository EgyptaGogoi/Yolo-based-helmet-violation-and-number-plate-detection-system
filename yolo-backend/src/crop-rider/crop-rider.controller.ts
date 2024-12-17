import { Body, Controller, Get, Query } from '@nestjs/common';
import { CropRiderService } from './crop-rider.service';

@Controller('crop-rider')
export class CropRiderController {

    constructor(private readonly cropRiderService: CropRiderService){}

    @Get(':fileName/crop')
    async cropImage(
        @Body('fileName') fileName: string,
        @Body('width') width: number,
        @Body('height') height: number,
        @Body('left') left: number,
        @Body('top') top: number) {
        const croppedImage = await this.cropRiderService.cropImage("cropImg",113,301,390.5,329.5,);
        return "success"
    }        

    // @Get()
    // async cropRiders(@Query('imageUrl') imageUrl: string, @Body() predictions: any[]){
    //     return this.cropRiderService.cropRiders(imageUrl,predictions);
    // }
}
