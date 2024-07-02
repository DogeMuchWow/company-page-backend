import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HomeContentsService } from './homeContents.service';
import { CreateHomeContentsDTO } from './dto/CreateHomeContents.DTO';

@ApiTags('Home contents')
@Controller('homeContents')
export class HomeContentsController {
  constructor(private homeContentService: HomeContentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create home content data' })
  async createHomeContent(
    @Body() createHomeContentsDTO: CreateHomeContentsDTO,
  ) {
    return await this.homeContentService.createHomeContent(
      createHomeContentsDTO,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get home content data' })
  @ApiResponse({ status: 200, description: 'Get data successfully' })
  getHomeContent() {
    return this.homeContentService.getHomeContent();
  }
}
