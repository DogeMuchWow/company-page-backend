import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeContentSchema, homeContent } from 'src/schemas/homeContent.schema';
import { HomeContentsService } from './homeContents.service';
import { HomeContentsController } from './homeContents.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: homeContent.name,
        schema: HomeContentSchema,
      },
    ]),
  ],
  providers: [HomeContentsService],
  controllers: [HomeContentsController],
})
export class homeContentsModule {}
