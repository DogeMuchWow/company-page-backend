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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNewsDTO } from './dto/CreateNews.DTO';
import { NewsService } from './news.service';
import { UpdateNewsDTO } from './dto/UpdateNews.DTO';

@ApiTags('news')
@Controller('news')
export class newsController {
  constructor(private newsService: NewsService) {}

  //Create news data
  @Post()
  @ApiOperation({ summary: 'Create news data' })
  async CreateNewsData(@Body() createNewsDTO: CreateNewsDTO) {
    return await this.newsService.CreateNewsData(createNewsDTO);
  }

  //Get all news data
  @Get()
  @ApiOperation({ summary: 'Get all news data' })
  GetNewsData() {
    return this.newsService.GetNewsData();
  }

  //Get news data by id
  @Get(':id')
  @ApiOperation({ summary: 'Get news data by id' })
  GetNewsDataById(@Param('id') id: string) {
    return this.newsService.GetNewsById(id);
  }

  //Get news data by page and pagination
  @Get('news,/:pageInput,/:limitInput')
  @ApiOperation({ summary: 'Get news data by page and pagination' })
  async GetNewsDataByPage(
    @Param('pageInput') pageInput: number,
    @Query('page') page = pageInput,
    @Param('limitInput') limitInput: number,
    @Query('limit') limit = limitInput,
  ) {
    const skip = (page - 1) * limit;
    const [news, count] = await Promise.all([
      this.newsService.findNewsData(skip, limit),
      this.newsService.getTotalNews(),
    ]);
    const totalPages = Math.ceil(count / limit);
    if (page < 0 || page > totalPages) {
      throw new HttpException(
        'ERROR: Page Input <= 0 or Page input > total page',
        422,
      );
    }
    if (limit <= 0) {
      throw new HttpException('ERROR: Limit input <= 0', 422);
    }
    return news;
  }

  //Update news data by id
  @Patch(':id')
  @ApiOperation({ summary: 'Update news data by id' })
  UpdateNewsDataById(@Param('id') id: string, updateNewsDTO: UpdateNewsDTO) {
    return this.newsService.UpdateNewsData(id, updateNewsDTO);
  }

  //Delete news data by id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete news data by id' })
  DeleteDataById(@Param('id') id: string) {
    return this.newsService.DeleteNewsData(id);
  }

  //Delete many news data by id
  @Delete()
  @ApiOperation({ summary: 'Delete many news data' })
  DeleteManyNewsById(@Body() newsIds: string[]) {
    return this.newsService.DeleteManyNewsData(newsIds);
  }
}
