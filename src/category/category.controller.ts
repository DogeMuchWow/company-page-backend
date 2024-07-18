import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/CreateCategory.DTO';
import { Types } from 'mongoose';
import { UpdateCategoryDTO } from './dto/UpdateCategory.DTO';

@ApiTags('Category')
@Controller('category')
export class categoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category data' })
  createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.categoryService.createCategory(createCategoryDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get category data' })
  getCategory() {
    return this.categoryService.getCategory();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  getCategoryById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Category id is not valid', 400);
    }
    const findCategory = this.categoryService.getCategoryById(id);
    if (!findCategory) throw new HttpException('Category is not found', 404);
    return findCategory;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category by' })
  updateCategory(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('id') id: string,
  ) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Category id not valid', 400);
    }
    const updateCategory = this.categoryService.updateCategory(
      id,
      updateCategoryDTO,
    );
    if (!updateCategory) throw new HttpException('Category not found', 404);
    return updateCategory;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  deleteCategory(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Category id not valid', 400);
    }
    const deleteCategory = this.categoryService.deleteCategory(id);
    if (!deleteCategory)
      throw new HttpException('Category cannot be deleted', 404);
    return deleteCategory;
  }
}
