import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

const mockUser = {
  id: 1,
  name: 'sabit',
  email: 'sabit+1@gmail.com',
  password: '$2b$10$A9uOYGCUxGaap1fheg35x.5zjEPwS4Aazqdi.MX4IMm8fl2WO7TKC',
  salt: '$2b$10$A9uOYGCUxGaap1fheg35x.',
};

describe('AuthService', () => {
  let authService;
  let authRepository;
  const mockAuthRepository = () => ({
    createUser: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useFactory: mockAuthRepository,
        },
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
    authRepository = await module.get<AuthRepository>(AuthRepository);
  });

  describe('create user', () => {
    it('should save a user in the database', async () => {
      authRepository.createUser.mockResolvedValue(mockUser);
      expect(authRepository.createUser).not.toHaveBeenCalled();
      const createUserDto = {
        name: 'sample name',
        email: 'test@test.com',
        password: 'adsgasdgSf234adge',
      };
      const result = await authService.create(createUserDto);
      expect(authRepository.createUser).toHaveBeenCalled();
      expect(result.id).toBeDefined();
      expect(result.email).toEqual(mockUser.email);
    });
  });

  describe('user login', () => {
    it('should get a user', async () => {
      authRepository.findOne.mockResolvedValue(mockUser);
      expect(authRepository.findOne).not.toHaveBeenCalled();
      const result = await authService.login(mockUser.email, 'sdfdfaSDd34sf#');
      expect(authRepository.findOne).toHaveBeenCalled();
      expect(result.access_token).toBeDefined();
    });

    it('should throw error Invalid credentials!', async () => {
      authRepository.findOne.mockResolvedValue(mockUser);
      expect(authRepository.findOne).not.toHaveBeenCalled();
      try {
        await authService.login(mockUser.email, 'sdfdfafSDd34sf#');
      } catch (e) {
        expect(e.message).toEqual('Invalid credentials!');
      }
    });

    it('should throw error User with email does not exist', async () => {
      authRepository.findOne.mockResolvedValue(undefined);
      expect(authRepository.findOne).not.toHaveBeenCalled();
      try {
        await authService.login('test@test.com', 'sdfdfafSDd34sf#');
      } catch (e) {
        expect(e.message).toEqual('User with email does not exist');
      }
    });
  });
});
