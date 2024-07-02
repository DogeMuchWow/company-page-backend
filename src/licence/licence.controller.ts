import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { LicensesService } from './licence.service';
import { UpdateLicensesDTO } from './dto/UpdateLicense.DTO';
import { CreatelicensesDTO } from './dto/CreateLicense.DTO';

@ApiTags('Licenses')
@Controller('licenses')
export class LicensesController {
  constructor(private licenseService: LicensesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create license data' })
  async createLicense(@Body() createLicensesDTO: CreatelicensesDTO) {
    return await this.licenseService.createLicense(createLicensesDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get license data' })
  getLicense() {
    return this.licenseService.getLicense();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get home content data by id' })
  getLicenseById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License data not found', 404);
    const findLicense = this.licenseService.getLicenseById(id);
    if (!findLicense) throw new HttpException('License not found', 404);
    return findLicense;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update license data by id' })
  async updateLicense(
    @Param('id') id: string,
    @Body() updateLicensesDTO: UpdateLicensesDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License id not found', 404);
    const updateLicense = await this.licenseService.updateLicense(
      id,
      updateLicensesDTO,
    );
    if (!updateLicense) throw new HttpException('License not found', 404);
    return updateLicense;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete license data by id' })
  async deleteHomeContent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('License id not found', 404);
    const deleteLicense = await this.licenseService.deleteLicense(id);
    if (!deleteLicense) throw new HttpException('Home Content not found', 404);
    return deleteLicense;
  }
}
