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
      const allowFile = this.allowFileType(image);
      if (allowFile) {
        if (image.mimetype.toString().toLowerCase().includes('svg')) {
          await fs.mkdir('./upload/images', { recursive: true });
          await fs.writeFile(imagePath, readImage);
        } else {
          const imageUploadBuffer = await this.imageSharpBuffer(readImage);
          await fs.mkdir('./upload/images', { recursive: true });
          await fs.writeFile(imagePath, imageUploadBuffer);
        }
        return `upload/images/${imageUniqueName}`;
      } else {
        return '';
      }
    } catch (error) {
      console.error('ERROR: ' + error);
      return '';
    } finally {
      try {
        await fs.unlink(image.path);
      } catch (error) {
        console.error('ERROR:' + error);
      }
    }
  }

  allowFileType(file: Express.Multer.File) {
    const mimeType = file.mimetype.toString().toLowerCase();
    if (
      file.mimetype &&
      file &&
      (mimeType.includes('png') ||
        mimeType.includes('jpeg') ||
        mimeType.includes('jpg') ||
        mimeType.includes('jfif') ||
        mimeType.includes('svg'))
    ) {
      return true;
    } else {
      console.log('File type not allow');
      return false;
    }
  }

  checkEmptyFile(file: Express.Multer.File) {
    if (file.size !== 0) {
      return false;
    } else {
      return true;
    }
  }

  private async imageSharpBuffer(file: Buffer) {
    await sharp(file).metadata();
    const imageBuffer = await sharp(file)
      .resize({ fit: sharp.fit.inside })
      .png({ quality: 70 })
      .jpeg({ quality: 70 })
      .toBuffer();
    return imageBuffer;
  }
}
