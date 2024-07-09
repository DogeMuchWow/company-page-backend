import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from 'src/schemas/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: user.name,
        schema: userSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class usersmodule {}
