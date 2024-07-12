import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { homeContent } from 'src/schemas/homeContent.schema';
import { CreateHomeContentsDTO } from './dto/CreateHomeContents.DTO';
import { UpdateHomeContentsDTO } from './dto/UpdateHomeContents.DTO';
import { ImagesUploadService } from 'src/images-upload/imagesUpload.service';
import fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class HomeContentsService {
  constructor(
    @InjectModel(homeContent.name) private homeContentModel: Model<homeContent>,
    private imageUploadService: ImagesUploadService,
  ) {}
  async createHomeContent(
    createHomeContentsDTO: CreateHomeContentsDTO,
    image: Express.Multer.File,
  ) {
    const imagePathProccess = await this.imageUploadService.imageUpload(image);
    createHomeContentsDTO.image = imagePathProccess;
    const newHomeContent = new this.homeContentModel(createHomeContentsDTO);
    return await newHomeContent.save();
  }

  //Read home content
  getHomeContent() {
    return this.homeContentModel.find();
  }

  //Read home content by id
  getHomeContentById(id: string) {
    return this.homeContentModel.findById(id);
  }

  //Read home content with pagination and page seperation
  async findData(limit: number, skip: number): Promise<homeContent[]> {
    return this.homeContentModel.find().limit(limit).skip(skip);
  }

  async getDataCount(): Promise<number> {
    return this.homeContentModel.countDocuments({}).exec();
  }

  //Update home content
  async updateHomeContent(
    id: string,
    updateHomeContentsDTO: UpdateHomeContentsDTO,
    image: Express.Multer.File,
  ) {
    const imagePathProcess = await this.imageUploadService.imageUpload(image);
    updateHomeContentsDTO.image = imagePathProcess;
    return await this.homeContentModel.findByIdAndUpdate(
      id,
      updateHomeContentsDTO,
    );
  }

  //Delete home content
  async deleteHomeContent(id: string) {
    try {
      const findData = await this.homeContentModel.findById(id);
      const imageString = findData?.image.toString();
      if (imageString) {
        const imagePath = join('./upload', imageString);
        //console.log(imagePath);
        fs.unlink(imagePath);
        console.log('Image delete');
      }
    } catch (error) {
      console.error('Home content not found');
    }
    return this.homeContentModel.findByIdAndDelete(id);
  }
}
