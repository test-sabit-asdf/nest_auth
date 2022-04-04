import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash, genSalt } from 'bcrypt';
import { isEqual } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { AuthRepository } from './auth.repository';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  private async hashPassword(password: string, salt: string) {
    return await hash(password, salt);
  }
  //create new user
  async create(data: CreateUserDto): Promise<Auth> {
    const secret = 'my-secret-key';

    const token = jwt.sign({ foo: 'bar' }, secret, { algorithm: 'none' });
    jwt.verify(token, '', { algorithms: ['HS256', 'none'] });
    //hash user password
    const salt = await genSalt();
    const hashPass = await this.hashPassword(data.password, salt);
    data.password = hashPass;

    return await this.authRepository.createUser(data, salt);
  }

  // user login
  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.authRepository.findOne({ email: email });

    if (!user) {
      throw new BadRequestException('User with email does not exist');
    }

    if (isEqual(user.password, await this.hashPassword(password, user.salt))) {
      return { access_token: 'YOUR TOKEN' };
    } else {
      throw new UnauthorizedException(`Invalid credentials!`);
    }
  }
}
