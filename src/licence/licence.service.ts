import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatelicensesDTO } from './dto/CreateLicense.DTO';
import { license } from 'src/schemas/licence.schema';
import { UpdateLicensesDTO } from './dto/UpdateLicense.DTO';

@Injectable()
export class LicensesService {
  constructor(
    @InjectModel(license.name) private LicenseModel: Model<license>,
  ) {}
  async createLicense(createLicensesDTO: CreatelicensesDTO) {
    const newLicense = new this.LicenseModel(createLicensesDTO);
    return await newLicense.save();
  }

  //Read license
  getLicense() {
    return this.LicenseModel.find();
  }

  //Read license by id
  getLicenseById(id: string) {
    return this.LicenseModel.findById(id);
  }

  //Update license
  async updateLicense(id: string, updateLicensesDTO: UpdateLicensesDTO) {
    return await this.LicenseModel.findByIdAndUpdate(id, updateLicensesDTO);
  }

  //Delete home content
  async deleteLicense(id: string) {
    return this.LicenseModel.findByIdAndDelete(id);
  }
}
