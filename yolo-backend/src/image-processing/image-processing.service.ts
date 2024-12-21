import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { DetectViolationService } from 'src/detect-violation/detect-violation.service';
import axios from 'axios'; // Add this import for axios

@Injectable()
export class ImageProcessingService {
  private readonly croppedImageFolder = path.join('D:\\mca\\project\\yolo_frontend\\croped-Image'); // Target folder for cropped images
  private readonly croppedNumberPlateFolder = path.join('D:\\mca\\project\\yolo-backend\\numberPlate'); // Target folder for cropped images

  // constructor(private readonly detectViolationService: DetectViolationService){}

  async cropImageFromData(boundingBoxes: any[]) {
    const fileName = "image.jpg"
    const imagePath = path.join('D:\\mca\\project\\yolo-backend\\uploads', fileName);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException(`Image with name ${fileName} not found.`);
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(this.croppedImageFolder)) {
      fs.mkdirSync(this.croppedImageFolder, { recursive: true });
    }

    const savedImagePaths: string[] = [];

    for (const [index, box] of boundingBoxes.entries()) {
      // Validate cropData for the current bounding box
      const { x, y, width, height } = box;
      if (x === undefined || y === undefined || width === undefined || height === undefined) {
        throw new BadRequestException(`Invalid crop data provided for bounding box at index ${index}.`);
      }

      // Convert center-based coordinates to top-left corner-based coordinates
      const cropRegion = {
        left: Math.floor(x - width / 2),
        top: Math.floor(y - height / 2),
        width: Math.floor(width),
        height: Math.floor(height),
      };

      // Get image metadata to validate cropping region
      const metadata = await sharp(imagePath).metadata();
      if (
        cropRegion.left < 0 ||
        cropRegion.top < 0 ||
        cropRegion.left + cropRegion.width > (metadata.width || 0) ||
        cropRegion.top + cropRegion.height > (metadata.height || 0)
      ) {
        throw new BadRequestException(`Crop region exceeds image bounds for bounding box at index ${index}.`);
      }

      // Generate the sequential file name
      const croppedFileName = `cropImage${savedImagePaths.length + 1}.jpg`;
      const croppedImagePath = path.join(this.croppedImageFolder, croppedFileName);

      // Perform the cropping operation and save the file
      await sharp(imagePath)
        .extract(cropRegion) // Crop the specified region
        .toFile(croppedImagePath); // Save to the target directory

      // Add the saved image path to the result array
      savedImagePaths.push(croppedImagePath);
    }

    // Return the paths of all cropped images
    return {
      message: `${savedImagePaths.length} cropped images saved successfully.`,
      paths: savedImagePaths,
    };
  }

  async cropNumberPlate(imagePath: string,boundingBoxes: any[]) {
    const fileName = "cropImage1.jpg"
    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException(`Image with name ${fileName} not found.`);
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(this.croppedNumberPlateFolder)) {
      fs.mkdirSync(this.croppedNumberPlateFolder, { recursive: true });
    }

    const savedImagePaths: string[] = [];

    for (const [index, box] of boundingBoxes.entries()) {
      // Validate cropData for the current bounding box
      const { x, y, width, height } = box;
      if (x === undefined || y === undefined || width === undefined || height === undefined) {
        throw new BadRequestException(`Invalid crop data provided for bounding box at index ${index}.`);
      }

      // Convert center-based coordinates to top-left corner-based coordinates
      const cropRegion = {
        left: Math.floor(x - width / 2),
        top: Math.floor(y - height / 2),
        width: Math.floor(width),
        height: Math.floor(height),
      };

      // Get image metadata to validate cropping region
      const metadata = await sharp(imagePath).metadata();
      if (
        cropRegion.left < 0 ||
        cropRegion.top < 0 ||
        cropRegion.left + cropRegion.width > (metadata.width || 0) ||
        cropRegion.top + cropRegion.height > (metadata.height || 0)
      ) {
        throw new BadRequestException(`Crop region exceeds image bounds for bounding box at index ${index}.`);
      }

      // Generate the sequential file name
      const croppedFileName = `cropImage${savedImagePaths.length + 1}.jpg`;
      const croppedImagePath = path.join(this.croppedNumberPlateFolder, croppedFileName);

      // Perform the cropping operation and save the file
      await sharp(imagePath)
        .extract(cropRegion) // Crop the specified region
        .toFile(croppedImagePath); // Save to the target directory

      // Add the saved image path to the result array
      savedImagePaths.push(croppedImagePath);
    }

    // Return the paths of all cropped images
    return {
      message: `${savedImagePaths.length} cropped images saved successfully.`,
      paths: savedImagePaths,
    };
  }

async cropImageFromDataUrl(boundingBoxes: any[], imageUrl: string) {
  const fileName = "image.jpg";
  
  // Fetch the image from the URL
  let imageBuffer;
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    imageBuffer = Buffer.from(response.data);
  } catch (error) {
    throw new NotFoundException(`Failed to download image from URL: ${imageUrl}`);
  }

  // Check if the file exists
  if (!imageBuffer) {
    throw new NotFoundException(`Image from URL could not be fetched.`);
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(this.croppedImageFolder)) {
    fs.mkdirSync(this.croppedImageFolder, { recursive: true });
  }

  const savedImagePaths: string[] = [];

  for (const [index, box] of boundingBoxes.entries()) {
    // Validate cropData for the current bounding box
    const { x, y, width, height } = box;
    if (x === undefined || y === undefined || width === undefined || height === undefined) {
      throw new BadRequestException(`Invalid crop data provided for bounding box at index ${index}.`);
    }

    // Convert center-based coordinates to top-left corner-based coordinates
    const cropRegion = {
      left: Math.floor(x - width / 2),
      top: Math.floor(y - height / 2),
      width: Math.floor(width),
      height: Math.floor(height),
    };

    // Get image metadata to validate cropping region
    const metadata = await sharp(imageBuffer).metadata();
    if (
      cropRegion.left < 0 ||
      cropRegion.top < 0 ||
      cropRegion.left + cropRegion.width > (metadata.width || 0) ||
      cropRegion.top + cropRegion.height > (metadata.height || 0)
    ) {
      throw new BadRequestException(`Crop region exceeds image bounds for bounding box at index ${index}.`);
    }

    // Generate the sequential file name
    const croppedFileName = `cropImage${savedImagePaths.length + 1}.jpg`;
    const croppedImagePath = path.join(this.croppedImageFolder, croppedFileName);

    // Perform the cropping operation and save the file
    await sharp(imageBuffer)
      .extract(cropRegion) // Crop the specified region
      .toFile(croppedImagePath); // Save to the target directory

    // Add the saved image path to the result array
    savedImagePaths.push(croppedImagePath);
  }

  // Return the paths of all cropped images
  return {
    message: `${savedImagePaths.length} cropped images saved successfully.`,
    paths: savedImagePaths,
  };
}

}
