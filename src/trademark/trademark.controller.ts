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
import { TrademarkService } from './trademark.service';
import { CreateTrademarkDTO } from './dto/CreateTrademark.DTO';
import { UpdateTrademarkDTO } from './dto/UpdateTrademark.DTO';

@ApiTags('Trademark')
@Controller('trademark')
export class TrademarkController {
  constructor(private trademarkService: TrademarkService) {}

  @Post()
  @ApiOperation({ summary: 'Create trademark data' })
  createTrademark(@Body() createTrademarkDTO: CreateTrademarkDTO) {
    return this.trademarkService.createTrademark(createTrademarkDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get trademark data' })
  gettrademark() {
    return this.trademarkService.getTrademark();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trademark by id' })
  getTrademarkById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Trademark id is not valid', 400);
    }
    const findTrademark = this.trademarkService.getTrademarkById(id);
    if (!findTrademark) throw new HttpException('Trademark is not found', 404);
    return findTrademark;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update trademark by id' })
  updateTrademark(
    @Body() updateTrademarkDTO: UpdateTrademarkDTO,
    @Param('id') id: string,
  ) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Trademark id not valid', 400);
    }
    const updateTrademark = this.trademarkService.updateTrademark(
      id,
      updateTrademarkDTO,
    );
    if (!updateTrademark) throw new HttpException('Trademark not found', 404);
    return updateTrademark;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete trademark' })
  deletetrademark(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Trademark id not valid', 400);
    }
    const deleteTrademark = this.trademarkService.deleteTrademark(id);
    if (!deleteTrademark)
      throw new HttpException('Trademark cannot be deleted', 404);
    return deleteTrademark;
  }
}
