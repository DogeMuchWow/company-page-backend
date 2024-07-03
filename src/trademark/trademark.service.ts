import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { trademark } from 'src/schemas/trademark.schema';
import { CreateTrademarkDTO } from './dto/CreateTrademark.DTO';
import { UpdateTrademarkDTO } from './dto/UpdateTrademark.DTO';

@Injectable()
export class TrademarkService {
  constructor(
    @InjectModel(trademark.name) private trademarkModule: Model<trademark>,
  ) {}

  //Create new trademark
  async createTrademark(createTrademarkDTO: CreateTrademarkDTO) {
    const newTrademark = new this.trademarkModule(createTrademarkDTO);
    return await newTrademark.save();
  }

  //Read trademark
  getTrademark() {
    return this.trademarkModule.find();
  }

  //Read trademark by id
  getTrademarkById(id: string) {
    return this.trademarkModule.findById(id);
  }

  //Update trademark
  async updateTrademark(id: string, updateTrademarkDTO: UpdateTrademarkDTO) {
    return await this.trademarkModule.findByIdAndUpdate(id, updateTrademarkDTO);
  }

  //Delete trademark
  async deleteTrademark(id: string) {
    return this.trademarkModule.findByIdAndDelete(id);
  }
}
