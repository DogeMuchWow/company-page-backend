import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { license, LicenseSchema } from 'src/schemas/licence.schema';
import { LicensesService } from './licence.service';
import { LicensesController } from './licence.controller';
import { imageUploadModule } from 'src/images-upload/imageUpload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: license.name,
        schema: LicenseSchema,
      },
    ]),
    imageUploadModule,
  ],
  providers: [LicensesService],
  controllers: [LicensesController],
})
export class licensesModule {}
