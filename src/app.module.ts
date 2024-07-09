import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { homeContentsModule } from './homeContents/homeContents.module';
import { ConfigModule } from '@nestjs/config';
import { contactTicketsModule } from './contactTickets/contactTickets.module';
import { contactBranchsModule } from './contactBranchs/contactBranchs.module';
import { licensesModule } from './licence/licence.module';
import { slidesModule } from './slide/slides.module';
import { categoryModule } from './category/category.module';
import { trademarkModule } from './trademark/trademark.module';
import { slideshowModule } from './slideshow/slideshow.module';
import { usersmodule } from './user/users.module';
import { newsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    homeContentsModule,
    contactTicketsModule,
    contactBranchsModule,
    licensesModule,
    slidesModule,
    categoryModule,
    trademarkModule,
    slideshowModule,
    usersmodule,
    newsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
