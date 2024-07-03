import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { SlideShowService } from './slideshow.service';
import { CreateSlideshowDTO } from './dto/CreateSlideshow.DTO';
import { UpdateSlideshowDTO } from './dto/UpdateSlideshow.DTO';

@ApiTags('Slideshow')
@Controller('slideshow')
export class SlideshowController {
  constructor(private slideshowService: SlideShowService) {}

  @Post()
  @ApiOperation({ summary: 'Create slideshow data' })
  createSlideshow(@Body() createSlideshowDTO: CreateSlideshowDTO) {
    return this.slideshowService.createSlideshow(createSlideshowDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get slideshow data' })
  getSlideshow() {
    return this.slideshowService.getSlideshow();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get slideshow by id' })
  getSlideshowById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Slideshow id is not valid', 400);
    }
    const findSlideshow = this.slideshowService.getSlideshowById(id);
    if (!findSlideshow) throw new HttpException('Category is not found', 404);
    return findSlideshow;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update slideshow by id' })
  updateCategory(
    @Body() updateSlideshowDTO: UpdateSlideshowDTO,
    @Param('id') id: string,
  ) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Slideshow id not valid', 400);
    }
    const updateSlideshow = this.slideshowService.updateSlideshow(
      id,
      updateSlideshowDTO,
    );
    if (!updateSlideshow) throw new HttpException('Slideshow not found', 404);
    return updateSlideshow;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete slideshow by id' })
  deleteSlideshow(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Slideshow id not valid', 400);
    }
    const deleteSlideshow = this.slideshowService.deleteSlideshow(id);
    if (!deleteSlideshow)
      throw new HttpException('Slideshow cannot be deleted', 404);
    return deleteSlideshow;
  }
}
