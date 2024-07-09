import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { newsSchema, news } from 'src/schemas/news.schema';
import { newsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: news.name,
        schema: newsSchema,
      },
    ]),
  ],
  controllers: [newsController],
  providers: [NewsService],
})
export class newsModule {}
