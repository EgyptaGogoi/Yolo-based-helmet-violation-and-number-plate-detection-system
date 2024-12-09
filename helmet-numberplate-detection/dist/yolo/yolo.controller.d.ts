import { YoloService } from './yolo.service';
export declare class YoloController {
    private readonly yoloService;
    constructor(yoloService: YoloService);
    interLocalImage(file: Express.Multer.File): Promise<any>;
}
