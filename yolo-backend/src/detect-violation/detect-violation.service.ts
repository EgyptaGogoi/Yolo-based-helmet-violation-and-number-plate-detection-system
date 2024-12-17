import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class DetectViolationService {
  
  // Method to detect violations from multiple images
  async detectViolation(imagePaths: string[]): Promise<any[]> {
    try {
      // Initialize an array to hold the results
      const results: any[] = [];

      // Iterate over each image path
      for (const imagePath of imagePaths) {
        // Ensure the image file exists
        if (!fs.existsSync(imagePath)) {
          throw new Error(`Image not found at path: ${imagePath}`);
        }

        // Create a new FormData object to handle the file upload
        const formData = new FormData();
        formData.append('file', fs.createReadStream(imagePath));  // Attach image file to the form

        // Send the request to Roboflow API for detection
        const response = await axios({
          method: 'POST',
          url: "https://detect.roboflow.com/helmet-detection-koeoj/3", // Replace with your model's API endpoint
          params: {
            api_key: "ALi15MAfe2TMEwydwlS0", // Replace with your API key
          },
          headers: {
            ...formData.getHeaders(), // Attach the form data headers
          },
          data: formData,  // Send the form data with the image
        });

        // Add the detection result for this image to the results array
        results.push({
          imagePath,
          detectionResult: response.data
        });
      }

      // Return all detection results
      return results;
    } catch (error) {
      // Handle and log errors
      console.error('Error in detecting rider violations:', error.message);
      throw new Error(`Error in detecting rider violations: ${error.message}`);
    }
  }
}
