import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { homeContent } from 'src/schemas/homeContent.schema';
import { CreateHomeContentsDTO } from './dto/CreateHomeContents.DTO';

@Injectable()
export class HomeContentsService {
  constructor(
    @InjectModel(homeContent.name) private homeContentModel: Model<homeContent>,
  ) {}
  async createHomeContent(createHomeContentsDTO: CreateHomeContentsDTO) {
    const newHomeContent = new this.homeContentModel(createHomeContentsDTO);
    return await newHomeContent.save();
  }
  async getHomeContent(): Promise<homeContent[]> {
    return await this.homeContentModel.find().exec();
  }
}
