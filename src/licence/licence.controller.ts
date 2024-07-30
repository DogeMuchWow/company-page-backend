import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { LicensesService } from './licence.service';
import { UpdateLicensesDTO } from './dto/UpdateLicense.DTO';
import { CreatelicensesDTO } from './dto/CreateLicense.DTO';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesUploadService } from 'src/images-upload/imagesUpload.service';
import fs from 'fs/promises';

@ApiTags('Licenses')
@Controller('licenses')
export class LicensesController {
  constructor(
    private licenseService: LicensesService,
    private imageUploadService: ImagesUploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './temp-images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'License text',
          example: 'Data',
        },
        images: {
          type: 'array',
          description: 'License images',
          items: {
            type: 'string',
            format: 'binary',
            description: 'The image file upload',
          },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create license data' })
  async createLicense(
    @Body() createLicensesDTO: CreatelicensesDTO,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    if (images && images.length > 0) {
      for (const image of images) {
        if (
          image !== undefined &&
          this.imageUploadService.allowFileType(image) === false
        ) {
          for (const singleImage of images) {
            fs.unlink(singleImage.path);
          }
          throw new HttpException('Invalid image type', 400);
        }
      }
    }
    return await this.licenseService.createLicense(createLicensesDTO, images);
  }

  @Get()
  @ApiOperation({ summary: 'Get license data' })
  getLicense() {
    return this.licenseService.getLicense();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get home content data by id' })
  getLicenseById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License data id not valid', 400);
    const findLicense = this.licenseService.getLicenseById(id);
    if (!findLicense) throw new HttpException('License not found', 404);
    return findLicense;
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './temp-images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Home contents tittle',
          example: 'Data',
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'The image file upload',
          example: '',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update license data by id' })
  async updateLicense(
    @Param('id') id: string,
    @Body() updateLicensesDTO: UpdateLicensesDTO,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License id not valid', 400);
    for (const image of images) {
      if (
        image !== undefined &&
        this.imageUploadService.allowFileType(image) === false
      ) {
        fs.unlink(image.path);
        throw new HttpException('Invalid image type', 400);
      }
    }

    const updateLicense = await this.licenseService.updateLicense(
      id,
      updateLicensesDTO,
      images,
    );
    if (!updateLicense) throw new HttpException('License not found', 404);
    return updateLicense;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete license data by id' })
  async deleteHomeContent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License id not valid', 400);
    const deleteLicense = await this.licenseService.deleteLicense(id);
    if (!deleteLicense) throw new HttpException('Home Content not found', 404);
    return deleteLicense;
  }

  @Patch(':id/:imageName')
  @ApiOperation({ summary: 'Delete license photo by name' })
  async deleteImageByNameAndId(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    console.log(id);
    console.log(imageName.toString());
    if (!isValid) throw new HttpException('License id not valid', 400);
    const deleteImage = await this.licenseService.deleteSelectedImage(
      id,
      imageName,
    );
    console.log(deleteImage);
    if (!deleteImage) throw new HttpException('Image cannot be deleted', 400);
    return deleteImage;
  }
}
