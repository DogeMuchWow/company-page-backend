import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (
      !image.mimetype ||
      !image.mimetype
        .toString()
        .toLowerCase()
        .includes('png' || 'jpeg' || 'jpg' || 'jfif')
    ) {
      return '';
    }
    try {
      await sharp(readImage).metadata();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Image validation error', error);
      return '';
    }
    try {
      const imageUploadBuffer = await sharp(readImage)
        .resize({ fit: sharp.fit.inside })
        .png({ quality: 70 })
        .jpeg({ quality: 70 })
        .toBuffer();
      await fs.mkdir('./upload/images', { recursive: true });
      await fs.writeFile(imagePath, imageUploadBuffer);
      return `upload/images/${imageUniqueName}`;
    } catch (error) {
      console.error('ERROR: ' + error);
      return '';
    } finally {
      try {
        await fs.unlink(image.path);
        console.log('Temp image remove');
      } catch (error) {
        console.error('ERROR:' + error);
      }
    }
  }
}
