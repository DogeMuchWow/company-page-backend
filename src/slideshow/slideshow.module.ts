import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, category } from 'src/schemas/category.schema';
import { SlideShowService } from './slideshow.service';
import { SlideshowController } from './slideshow.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [SlideShowService],
  controllers: [SlideshowController],
})
export class categoryModule {}
