import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { validate } from 'class-validator';

describe('AuthController', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {
    const ApiAuthServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        create: jest.fn(),
        login: jest.fn(),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApiAuthServiceProvider],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it('should be defined controller & spyService', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });

  it('create new user with proper data type', () => {
    const dto = new CreateUserDto();
    expect(controller.create(dto)).not.toEqual(null);
  });

  it('calling create method', () => {
    const dto = new CreateUserDto();
    controller.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  });

  it('login user with proper data type', () => {
    controller.login('test@test.com', 'password');
    expect(spyService.login).toHaveBeenCalled();
    expect(controller.login('test@test.com', 'password')).not.toEqual(null);
  });

  it('calling login method', () => {
    controller.login('test@test.com', 'password');
    expect(spyService.login).toHaveBeenCalled();
    expect(spyService.login).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should fail on invalid DTO', async () => {
    const dto = new CreateUserDto();
    dto.name = 'sabit'; //pass
    dto.email = 'test'; //fail
    dto.password = 'sadg'; //fail

    const errors = await validate(dto);
    expect(errors.length).not.toBe(0);
    expect(errors.length).toBe(2);
  });
});
