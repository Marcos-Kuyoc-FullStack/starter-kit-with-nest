import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profiles, ProfilesDocument } from './schemas/profiles.schema';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profiles.name) private profileModule: Model<ProfilesDocument>,
    private userService: UsersService,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const { userId } = createProfileDto;
    const user = await this.userService.findById(userId);

    if (!user) throw new HttpException('USER_NOT_FOUNT', HttpStatus.NOT_FOUND);

    return await this.profileModule.create(createProfileDto);
  }

  async findAll() {
    return await this.profileModule.find();
  }

  async findOne(query: object) {
    return await this.profileModule.findOne(query);
  }

  async findById(id: string) {
    return await this.profileModule.findById(id);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return await this.profileModule.findByIdAndUpdate(id, updateProfileDto);
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
