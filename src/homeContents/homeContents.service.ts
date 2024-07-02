import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { homeContent } from 'src/schemas/homeContent.schema';
import { CreateHomeContentsDTO } from './dto/CreateHomeContents.DTO';
import { UpdateHomeContentsDTO } from './dto/UpdateHomeContents.DTO';

@Injectable()
export class HomeContentsService {
  constructor(
    @InjectModel(homeContent.name) private homeContentModel: Model<homeContent>,
  ) {}
  async createHomeContent(createHomeContentsDTO: CreateHomeContentsDTO) {
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

  //Update home content
  async updateHomeContent(
    id: string,
    updateHomeContentsDTO: UpdateHomeContentsDTO,
  ) {
    return await this.homeContentModel.findByIdAndUpdate(
      id,
      updateHomeContentsDTO,
    );
  }

  //Delete home content
  async deleteHomeContent(id: string) {
    return this.homeContentModel.findByIdAndDelete(id);
  }
}
