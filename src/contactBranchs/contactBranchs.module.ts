import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContactBranchSchema,
  contactBranch,
} from 'src/schemas/contactBranch.schema';
import { ContactBranchsService } from './contactBranchs.service';
import { contactBranchsController } from './contactBranchs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: contactBranch.name,
        schema: ContactBranchSchema,
      },
    ]),
  ],
  providers: [ContactBranchsService],
  controllers: [contactBranchsController],
})
export class contactBranchsModule {}
