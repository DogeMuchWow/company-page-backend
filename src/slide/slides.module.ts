import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { slide, slideSchema } from 'src/schemas/slide.schema';
import { SlidesService } from './slides.service';
import { SlidesController } from './slides.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: slide.name,
        schema: slideSchema,
      },
    ]),
  ],
  providers: [SlidesService],
  controllers: [SlidesController],
})
export class slidesModule {}
