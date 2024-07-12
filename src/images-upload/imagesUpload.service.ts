import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { extname } from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';

@Injectable()
export class ImagesUploadService {
  async imageUpload(image: Express.Multer.File): Promise<string> {
    const imageUniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(image.originalname)}`;
    const imagePath = `./upload/images/${imageUniqueName}`;
    const readImage = await promises.readFile(image.path);

    try {
      const imageUploadBuffer = await sharp(readImage)
        .resize({ fit: sharp.fit.inside })
        .jpeg({ quality: 70 })
        .toBuffer();
      await fs.mkdir('./upload/images', { recursive: true });
      await fs.writeFile(imagePath, imageUploadBuffer);
      const testImage = sharp(imageUploadBuffer);
      const metadata = await testImage.metadata();
      console.log(metadata);
      console.log(image);
      console.log(readImage);
    } catch (error) {
      console.error('ERROR: ' + error);
    }
    try {
      await fs.unlink(image.path);
      console.log('Temp image remove');
    } catch (error) {
      console.error('ERROR:' + error);
    }
    return `upload/images/${imageUniqueName}`;
  }
}
