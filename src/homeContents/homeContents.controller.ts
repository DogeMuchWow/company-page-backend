import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeContentsService } from './homeContents.service';
import { CreateHomeContentsDTO } from './dto/CreateHomeContents.DTO';
import mongoose from 'mongoose';
import { UpdateHomeContentsDTO } from './dto/UpdateHomeContents.DTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Home contents')
@Controller('homeContents')
export class HomeContentsController {
  constructor(private homeContentService: HomeContentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './temp-images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Home contents tittle',
          example: 'Sản phẩm',
        },
        description: {
          type: 'string',
          description: 'Home contents description',
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'The image file upload',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create home content data' })
  async createHomeContent(
    @Body() createHomeContentsDTO: CreateHomeContentsDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.homeContentService.createHomeContent(
      createHomeContentsDTO,
      image,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get home content data' })
  getHomeContent() {
    return this.homeContentService.getHomeContent();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get home content data by id' })
  getHomeContentById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Home content id not valid', 400);
    const findHomeContent = this.homeContentService.getHomeContentById(id);
    if (!findHomeContent)
      throw new HttpException('Home content not found', 404);
    return findHomeContent;
  }

  @Get('data/:pageInput/:limitInput')
  @ApiOperation({ summary: 'Get home content by pagination' })
  async getHomeContentByPagination(
    @Param('pageInput') pageInput: number,
    @Query('page') page = pageInput,
    @Param('limitInput') limitInput: number,
    @Query('limit') limit = limitInput,
  ) {
    const skip = (page - 1) * limit;
    const [data, count] = await Promise.all([
      this.homeContentService.findData(limit, skip),
      this.homeContentService.getDataCount(),
    ]);
    const totalPages = Math.ceil(count / limit);
    if (page <= 0 || page > totalPages)
      throw new HttpException(
        'ERROR: Current page > total pages or current page <= 0',
        422,
      );

    if (limitInput <= 0)
      throw new HttpException('ERROR: Page limit must be larger than 0', 422);
    return {
      data,
      // totalPages,
      // currentPage: page,
      // itemPerPage: limit,
      // totaItem: count,
    };
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './temp-images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Home contents tittle',
          example: 'Sản phẩm',
        },
        description: {
          type: 'string',
          description: 'Home contents description',
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'The image file upload',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update home content data by id' })
  async updateHomeContent(
    @Param('id') id: string,
    @Body() updateHomeContentsDTO: UpdateHomeContentsDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Home content id not valid', 400);
    const updateHomeContent = await this.homeContentService.updateHomeContent(
      id,
      updateHomeContentsDTO,
      image,
    );
    if (!updateHomeContent)
      throw new HttpException('Home content not found', 404);
    return updateHomeContent;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete home content data by id' })
  async deleteHomeContent(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Home Content id not valid', 400);
    const deleteHomeContent =
      await this.homeContentService.deleteHomeContent(id);
    if (!deleteHomeContent)
      throw new HttpException('Home Content not found', 404);
    return deleteHomeContent;
  }
}
