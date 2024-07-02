import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slide } from 'src/schemas/slide.schema';
import { CreateSlidesDTO } from './dto/CreateSlides.DTO';
import { UpdateSlidesDTO } from './dto/UpdateSlides.DTO';

@Injectable()
export class SlidesService {
  constructor(@InjectModel(slide.name) private SlideModel: Model<slide>) {}
  async createSlide(createSlidesDTO: CreateSlidesDTO) {
    const newSlide = new this.SlideModel(createSlidesDTO);
    return await newSlide.save();
  }

  //Read license
  getLicense() {
    return this.SlideModel.find();
  }

  //Read license by id
  getLicenseById(id: string) {
    return this.SlideModel.findById(id);
  }

  //Update license
  async updateSlide(id: string, updateSlidesDTO: UpdateSlidesDTO) {
    return await this.SlideModel.findByIdAndUpdate(id, updateSlidesDTO);
  }

  //Delete home content
  async deleteSlide(id: string) {
    return this.SlideModel.findByIdAndDelete(id);
  }
}
