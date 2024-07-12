import { Module } from '@nestjs/common';
import { ImagesUploadService } from './imagesUpload.service';

@Module({
  exports: [ImagesUploadService],
  providers: [ImagesUploadService],
})
export class imageUploadModule {}
