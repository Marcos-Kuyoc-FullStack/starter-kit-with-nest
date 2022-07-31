import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/schema/users.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModule: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plaintToHash = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: plaintToHash };

    return await this.usersModule.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.usersModule.findOne({ email });

    if (!user) throw new HttpException('USER_NOT_FOUNT', HttpStatus.NOT_FOUND);

    const checkPasswort = await compare(password, user.password);

    if (!checkPasswort)
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload);

    const data = {
      user,
      token,
    };
    return data;
  }
}
