import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { homeContentsModule } from './homeContents/homeContents.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log(ConfigModule.forRoot());
@Module({
  imports: [
    //127 because node 18 and up prefer ipv6
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    homeContentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
