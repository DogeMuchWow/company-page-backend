import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, category } from 'src/schemas/category.schema';
import { CategoryService } from './category.service';
import { categoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService],
  controllers: [categoryController],
})
export class categoryModule {}
