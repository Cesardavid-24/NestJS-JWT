import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtContanst } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from '../users/entities/user.entity';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    UsersModule,
    ItemsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtContanst.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
