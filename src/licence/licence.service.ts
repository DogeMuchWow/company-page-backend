import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatelicensesDTO } from './dto/CreateLicense.DTO';
import { license } from 'src/schemas/licence.schema';
import { UpdateLicensesDTO } from './dto/UpdateLicense.DTO';
import { ImagesUploadService } from 'src/images-upload/imagesUpload.service';
import fs from 'fs/promises';

@Injectable()
export class LicensesService {
  constructor(
    @InjectModel(license.name) private licenseModel: Model<license>,
    private imageUploadService: ImagesUploadService,
  ) {}
  async createLicense(
    createLicensesDTO: CreatelicensesDTO,
    images: Array<Express.Multer.File>,
  ) {
    const imagesPath: string[] = [];
    if (images !== undefined) {
      for (const image of images) {
        if (image !== undefined) {
          const imagePathProccess =
            await this.imageUploadService.imageUpload(image);
          imagesPath.push(imagePathProccess);
        }
      }
    }
    createLicensesDTO.images = imagesPath;
    const newLicense = new this.licenseModel(createLicensesDTO);
    return await newLicense.save();
  }

  //Read license
  getLicense() {
    return this.licenseModel.find();
  }

  //Read license by id
  getLicenseById(id: string) {
    return this.licenseModel.findById(id);
  }

  //Update license
  async updateLicense(
    id: string,
    updateLicensesDTO: UpdateLicensesDTO,
    images: Array<Express.Multer.File>,
  ) {
    const findData = await this.licenseModel.findById(id);
    if (findData?.images && findData.images.length > 0) {
      for (const imagePath of findData.images) {
        if (typeof imagePath === 'string' && imagePath !== '') {
          fs.unlink(imagePath);
        }
      }
    }

    const imagePaths: string[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const imagePath = await this.imageUploadService.imageUpload(image);
        imagePaths.push(imagePath);
      }
    }
    updateLicensesDTO.images = imagePaths;
    return await this.licenseModel.findByIdAndUpdate(id, updateLicensesDTO);
  }

  //Delete licence
  async deleteLicense(id: string) {
    const findData = await this.licenseModel.findById(id);
    if (findData?.images && findData.images.length > 0) {
      for (const imagePath of findData.images) {
        if (typeof imagePath === 'string' && imagePath !== '') {
          fs.unlink(imagePath);
        }
      }
    }
    return this.licenseModel.findByIdAndDelete(id);
  }

  //Delete selected image
  async deleteSelectedImage(id: string, imageName: string) {
    const findData = await this.licenseModel.findById(id);
    const afterDeleteImages: string[] = [];
    if (findData?.images && findData.images.length > 0) {
      for (const imagePath of findData.images) {
        afterDeleteImages.push(imagePath);
        // Get the filename with extension
        const filenameWithExtension = imagePath.substring(
          imagePath.lastIndexOf('/') + 1,
        );
        // Remove the extension
        const filename = filenameWithExtension.replace(/\.[^/.]+$/, '');
        console.log(typeof imagePath === 'string');
        console.log(imagePath !== '');
        console.log(imageName);
        console.log(filename);

        if (
          typeof imagePath === 'string' &&
          imagePath !== '' &&
          filename.toLowerCase() === imageName.toLowerCase()
        ) {
          try {
            fs.unlink(imagePath);
            afterDeleteImages.pop();
          } catch (error) {
            console.error(error);
          }
        }

        // findData.images = findData.images.filter(
        //   (imgPath) => imgPath !== imagePath,
        // );
      }
      console.log(afterDeleteImages);
      findData.images = afterDeleteImages;

      await findData.save();
      return findData;
    }
  }
}
