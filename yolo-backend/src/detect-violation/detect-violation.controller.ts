import { Controller, Get } from '@nestjs/common';
import { DetectViolationService } from './detect-violation.service';

@Controller('detect-violation')
export class DetectViolationController {
    
    constructor(private readonly detectViolationService: DetectViolationService){}

    @Get()
    detectViolation(){
        const paths = [
        "D:\\mca\\project\\yolo-backend\\croped-Image\\cropImage1.jpg",
        "D:\\mca\\project\\yolo-backend\\croped-Image\\cropImage2.jpg",
        "D:\\mca\\project\\yolo-backend\\croped-Image\\cropImage3.jpg",
        "D:\\mca\\project\\yolo-backend\\croped-Image\\cropImage4.jpg"
    ]
        return this.detectViolationService.detectViolation(paths);
    }
}
