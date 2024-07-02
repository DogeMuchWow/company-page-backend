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
import { SlidesService } from './slides.service';
import { CreateSlidesDTO } from './dto/CreateSlides.DTO';
import { UpdateSlidesDTO } from './dto/UpdateSlides.DTO';

@ApiTags('Slides')
@Controller('slides')
export class SlidesController {
  constructor(private slideService: SlidesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create slide data' })
  async createSlide(@Body() createSlidesDTO: CreateSlidesDTO) {
    return await this.slideService.createSlide(createSlidesDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get slide data' })
  getSlide() {
    return this.slideService.getLicense();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get slide data by id' })
  getSlideId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Slide data not found', 404);
    const findSlide = this.slideService.getLicenseById(id);
    if (!findSlide) throw new HttpException('Slide not found', 404);
    return findSlide;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update slide data by id' })
  async updateSlide(
    @Param('id') id: string,
    @Body() updateSlidesDTO: UpdateSlidesDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Slide id not found', 404);
    const updateSlide = await this.slideService.updateSlide(
      id,
      updateSlidesDTO,
    );
    if (!updateSlide) throw new HttpException('License not found', 404);
    return updateSlide;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete slide data by id' })
  async deleteSlide(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Slide id not found', 404);
    const deleteSlide = await this.slideService.deleteSlide(id);
    if (!deleteSlide) throw new HttpException('Slide not found', 404);
    return deleteSlide;
  }
}
