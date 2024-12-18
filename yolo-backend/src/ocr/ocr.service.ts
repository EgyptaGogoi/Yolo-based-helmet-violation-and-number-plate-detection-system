import { Injectable, Logger } from '@nestjs/common';
import { EasyOCR } from 'node-easyocr';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);
  private readonly ocr = new EasyOCR();

  constructor() {
    // Set the Python binary explicitly to "python"
    process.env.PYTHON_BIN = 'python';
    this.initOCR();
  }

  private async initOCR() {
    try {
      await this.ocr.init(['en']);
      this.logger.log('OCR initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize OCR:', error.message);
    }
  }

  async extractText(imagePath: string) {
    try {
      this.logger.log(`Processing image: ${imagePath}`);
      const result = await this.ocr.readText(imagePath);

      const extractedData = result.map((item) => ({
        text: item.text,
        confidence: item.confidence,
        bbox: item.bbox,
      }));

      this.logger.log(`OCR processing complete for ${imagePath}`);
      return extractedData;
    } catch (error) {
      this.logger.error(`OCR Error for ${imagePath}:`, error.message);
      throw new Error('OCR processing failed');
    }
  }

  async closeOCR() {
    try {
      await this.ocr.close();
      this.logger.log('OCR resources released successfully');
    } catch (error) {
      this.logger.error('Failed to close OCR:', error.message);
    }
  }
}
