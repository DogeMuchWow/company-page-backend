import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { news } from 'src/schemas/news.schema';
import { CreateNewsDTO } from './dto/CreateNews.DTO';
import { UpdateNewsDTO } from './dto/UpdateNews.DTO';

@Injectable()
export class NewsService {
  constructor(@InjectModel(news.name) private newsModel: Model<news>) {}

  //Create news data
  async CreateNewsData(createNewsDTO: CreateNewsDTO) {
    const date = new Date();
    const currentDateString =
      date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const newData = new this.newsModel(
      createNewsDTO,
      (createNewsDTO.timepublic = currentDateString),
    );
    return await newData.save();
  }

  //Get all news data
  GetNewsData() {
    return this.newsModel.find();
  }

  //Get news data by id
  GetNewsById(id: string) {
    return this.newsModel.findById(id);
  }

  //Get news by page and pagination
  async findNewsData(skip: number, limit: number): Promise<news[]> {
    return await this.newsModel.find().skip(skip).limit(limit);
  }

  async getTotalNews(): Promise<number> {
    return await this.newsModel.countDocuments({}).exec();
  }

  //Update news data
  async UpdateNewsData(id: string, updateNewsDTO: UpdateNewsDTO) {
    return await this.newsModel.findByIdAndUpdate(id, updateNewsDTO);
  }

  //Delete news data by id
  async DeleteNewsData(id: string) {
    return await this.newsModel.findByIdAndDelete(id);
  }

  //Delete many news data by id
  async DeleteManyNewsData(newsIds: string[]) {
    return await this.newsModel.deleteMany({ _id: { $in: newsIds } });
  }
}
