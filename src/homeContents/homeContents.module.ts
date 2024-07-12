import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeContentSchema, homeContent } from 'src/schemas/homeContent.schema';
import { HomeContentsService } from './homeContents.service';
import { HomeContentsController } from './homeContents.controller';
import { imageUploadModule } from 'src/images-upload/imageUpload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: homeContent.name,
        schema: HomeContentSchema,
      },
    ]),
    imageUploadModule,
  ],
  providers: [HomeContentsService],
  controllers: [HomeContentsController],
})
export class homeContentsModule {}
