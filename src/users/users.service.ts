import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument, Users } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersModule.create(createUserDto);
  }

  async findAll() {
    return await this.usersModule.find();
  }

  async findOne(id: number) {
    return await this.usersModule.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersModule.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
