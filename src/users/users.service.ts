import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './entities/user.entity';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const planinToHash = await hash(password, 10);

    createUserDto = { ...createUserDto, password: planinToHash };
    const userCreated = await this.userModel.create(createUserDto);
    return userCreated;
  }

  findAll() {
    return this.userModel.find({});
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!userUpdated)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    return userUpdated;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
