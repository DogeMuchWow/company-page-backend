import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { homeContentsModule } from './homeContents/homeContents.module';
import { ConfigModule } from '@nestjs/config';
import { contactTicketsModule } from './contactTickets/contactTickets.module';
import { contactBranchsModule } from './contactBranchs/contactBranchs.module';
import { liciensesModule } from './licence/licence.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    homeContentsModule,
    contactTicketsModule,
    contactBranchsModule,
    liciensesModule,
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
