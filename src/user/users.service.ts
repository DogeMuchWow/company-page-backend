import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/CreateUser.DTO';
import { UpdateUserDTO } from './dto/UpdateUser.DTO';

@Injectable()
export class UserService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}

  //Create new user
  async createNewUser(createUserDTO: CreateUserDTO) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createUserDTO.password, saltRounds);
    const newUser = new this.userModel(
      createUserDTO,
      (createUserDTO.password = passwordHash),
    );
    return newUser.save();
  }

  //Read all user
  getUser() {
    return this.userModel.find();
  }

  //Get user by id
  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  //Read user by page
  async findData(skip: number, limit: number): Promise<user[]> {
    return await this.userModel.find().skip(skip).limit(limit);
  }

  async getAllDocument(): Promise<number> {
    return await this.userModel.find().countDocuments({}).exec();
  }

  //Update user by id
  async UpdateUserById(id: string, updateUserDTO: UpdateUserDTO) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDTO);
  }

  //Delete user
  async DeleteUserById(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  //Delete multiple user
  async DeleteManyUserById(userIds: string[]) {
    return this.userModel.deleteMany({ _id: { $in: userIds } });
  }
}
