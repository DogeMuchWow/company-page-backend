import { Injectable } from '@nestjs/common';
import { category } from 'src/schemas/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDTO } from './dto/CreateCategory.DTO';
import { UpdateCategoryDTO } from './dto/UpdateCategory.DTO';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(category.name) private categoryModule: Model<category>,
  ) {}

  //Create new category
  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    const newCategory = new this.categoryModule(createCategoryDTO);
    return await newCategory.save();
  }

  //Read category
  getCategory() {
    return this.categoryModule.find();
  }

  //Read category by id
  getCategoryById(id: string) {
    return this.categoryModule.findById(id);
  }

  //Update category
  async updateCategory(id: string, updateCategoryDTO: UpdateCategoryDTO) {
    return await this.categoryModule.findByIdAndUpdate(id, updateCategoryDTO);
  }

  //Delete category
  async deleteCategory(id: string) {
    return this.categoryModule.findByIdAndDelete(id);
  }
}
