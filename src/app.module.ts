import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { homeContentsModule } from './homeContents/homeContents.module';
import { ConfigModule } from '@nestjs/config';
import { contactTicketsModule } from './contactTickets/contactTickets.module';
import { contactBranchsModule } from './contactBranchs/contactBranchs.module';
import { licensesModule } from './licence/licence.module';
import { slidesModule } from './slide/slides.module';
import { categoryModule } from './category/category.module';

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
  ],
  //ConfigModule.forRoot(),
  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   useFactory: async (configService: ConfigService) => ({
  //     uri: configService.get<string>('MONGODB_URI'),
  //   }),
  //   inject: [ConfigService],
  // }),
  controllers: [],
  providers: [],
})
export class AppModule {}
