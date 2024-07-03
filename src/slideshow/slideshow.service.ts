import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { slideshow } from 'src/schemas/slideshow.schema';
import { CreateSlideshowDTO } from './dto/CreateSlideshow.DTO';
import { UpdateSlideshowDTO } from './dto/UpdateSlideshow.DTO';

@Injectable()
export class SlideShowService {
  constructor(
    @InjectModel(slideshow.name) private slideShowModule: Model<slideshow>,
  ) {}

  //Create new slideshow
  async createSlideshow(createSlideshowDTO: CreateSlideshowDTO) {
    const newSlideshow = new this.slideShowModule(createSlideshowDTO);
    return await newSlideshow.save();
  }

  //Read slideshow
  getSlideshow() {
    return this.slideShowModule.find();
  }

  //Read slideshow by id
  getSlideshowById(id: string) {
    return this.slideShowModule.findById(id);
  }

  //Update slideshow
  async updateSlideshow(id: string, updateSlideshowDTO: UpdateSlideshowDTO) {
    return await this.slideShowModule.findByIdAndUpdate(id, updateSlideshowDTO);
  }

  //Delete slideshow
  async deleteSlideshow(id: string) {
    return this.slideShowModule.findByIdAndDelete(id);
  }
}
