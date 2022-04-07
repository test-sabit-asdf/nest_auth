import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Auth } from './entity/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Auth,
  })
  async create(@Body() data: CreateUserDto): Promise<Auth> {
    return this.authService.create(data);
  }

  @Post('/login')
  // @ApiParam({
  //   name: 'email',
  //   allowEmptyValue: false,
  // })
  // @ApiParam({
  //   name: 'password',
  //   allowEmptyValue: false,
  // })
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }
}
