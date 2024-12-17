import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class UploadService {
  private uploadFolder = path.join(process.cwd(), 'uploads');

  constructor() {
    // Create uploads folder if it doesn't exist
    if (!fs.existsSync(this.uploadFolder)) {
      fs.mkdirSync(this.uploadFolder, { recursive: true });
    }
  }

  async uploadFileFromUrl(fileUrl: string, filename: string): Promise<string> {
    try {
      // Step 1: Fetch the file using Axios
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream', // Stream the file
      });

      // Step 2: Create a local file path
      const filePath = path.join(this.uploadFolder, filename);

      // Step 3: Pipe the file stream to the local file
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      // Step 4: Wait for the file to finish writing
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      return filePath;
    } catch (error) {
      console.error('Error downloading or saving the file:', error.message);
      throw new Error('Failed to upload file from URL');
    }
  }
}
