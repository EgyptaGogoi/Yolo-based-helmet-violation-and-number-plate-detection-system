import { Injectable } from '@nestjs/common';
import axios from 'axios'
import * as fs from 'fs'

@Injectable()
export class YoloService {
    private readonly apiUrl = process.env.ROBOFLOW_API_URL;
    private readonly apiKey = process.env.ROBOFLOW_API_KEY;

    async inferLocalImage(imagePath: string): Promise<any> {
        const imageBase64 = fs.readFileSync(imagePath, {encoding: 'base64'});

        try {
            const response = await axios({
                method: 'POST',
                url: this.apiUrl,
                params: {
                    api_key: this.apiKey,
                },
                data: imageBase64,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async inferImageUrl(imageUrl: string): Promise<any> {
        try {
          const response = await axios({
            method: 'POST',
            url: this.apiUrl,
            params: {
              api_key: this.apiKey,
              image: imageUrl,
            },
          });
          return response.data;
        } catch (error) {
          throw new Error(error.message);
        }
      }

}
