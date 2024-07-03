import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { trademark, trademarkSchema } from 'src/schemas/trademark.schema';
import { TrademarkController } from './trademark.controller';
import { TrademarkService } from './trademark.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: trademark.name,
        schema: trademarkSchema,
      },
    ]),
  ],
  controllers: [TrademarkController],
  providers: [TrademarkService],
})
export class trademarkModule {}
