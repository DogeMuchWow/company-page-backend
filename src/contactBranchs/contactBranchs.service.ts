import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { contactBranch } from 'src/schemas/contactBranch.schema';
import { CreateContactBranchsDTO } from './dto/CreateContactBranch.DTO';
import { UpdateContactBranchsDTO } from './dto/UpdateContactBranch.DTO';

@Injectable()
export class ContactBranchsService {
  constructor(
    @InjectModel(contactBranch.name)
    private contactBranchsModule: Model<contactBranch>,
  ) {}

  //Create new contact branch
  async createContactBranch(createContactBranchsDTO: CreateContactBranchsDTO) {
    const newContactBranch = new this.contactBranchsModule(
      createContactBranchsDTO,
    );
    return await newContactBranch.save();
  }

  //Read contact branch
  getContactBranch() {
    return this.contactBranchsModule.find();
  }

  //Read contact branch by id
  getContactBranchById(id: string) {
    return this.contactBranchsModule.findById(id);
  }

  //Update contact branch
  async updateContactBranch(
    id: string,
    updateContactBranchsDTO: UpdateContactBranchsDTO,
  ) {
    return await this.contactBranchsModule.findByIdAndUpdate(
      id,
      updateContactBranchsDTO,
    );
  }

  //Delete contact branch
  async deleteContactBranch(id: string) {
    return this.contactBranchsModule.findByIdAndDelete(id);
  }
}
