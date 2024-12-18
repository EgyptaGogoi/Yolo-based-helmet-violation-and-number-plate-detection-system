import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract')
  async extractText(@Body('imagePath') imagePath: string) {
    if (!imagePath) {
      throw new Error('Image path is required');
    }

    const extractedData = await this.ocrService.extractText(imagePath);
    return {
      message: 'Text extraction successful',
      data: extractedData,
    };
  }
}
