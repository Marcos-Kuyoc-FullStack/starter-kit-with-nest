import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profiles, ProfilesDocument } from './schemas/profiles.schema';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profiles.name) private profileModule: Model<ProfilesDocument>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.profileModule.create(createProfileDto);
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profileModule.findByIdAndUpdate(id, updateProfileDto);
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
