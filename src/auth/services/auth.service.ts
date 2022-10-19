import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserDto,
  LoginUserDto,
  UserDto,
} from '../../users/dtos/users.dtos';

export class RegistrationStatus {
  success: boolean;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.usersService.registerUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    return {
      ...user,
      ...token,
    };
  }

  private _createToken({ id }: UserDto) {
    const options = {
      secret: `${process.env.SECRET_KEY}`,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
    const accessToken = this.jwtService.sign({ id }, options);
    return {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
      accessToken,
    };
  }

  async validateUser(username: string) {
    const user = await this.usersService.findCleanedUserByUserName(username);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
