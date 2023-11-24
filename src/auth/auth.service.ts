import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from 'src/users/entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword)
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);

    const payload = { id: findUser._id, name: findUser.name };

    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
