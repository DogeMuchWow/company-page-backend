import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlideshowService } from './slideshow.service';
import { SlideshowController } from './slideshow.controller';
import { slideshow, slideshowSchema } from 'src/schemas/slideshow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: slideshow.name,
        schema: slideshowSchema,
      },
    ]),
  ],
  providers: [SlideshowService],
  controllers: [SlideshowController],
})
export class slideshowModule {}
