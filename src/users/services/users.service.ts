import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(userDto: CreateUserDto) {
    const username = userDto.username;
    const user = await this.userRepository.findOneBy({ username });

    if (user) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.userRepository.create(userDto);
    await this.userRepository.save(newUser);
  }

  async findByLogin({ username, password }: LoginUserDto) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const arePasswordsSame = await bcrypt.compare(password, user.password);

    if (!arePasswordsSame) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { id: user.id, username: user.username };
  }

  async findCleanedUserByUserName(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    return {
      id: user?.id,
      username: user?.username,
    };
  }
}
