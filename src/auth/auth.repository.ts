import { Repository, EntityRepository } from 'typeorm';
import { Auth } from './entity/auth.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  //create new user
  public async createUser(
    createUserDto: CreateUserDto,
    salt: string,
  ): Promise<Auth> {
    const { name, email, password } = createUserDto;

    const user = new Auth();
    user.name = name;
    user.email = email;
    user.password = password;
    user.salt = salt;

    await user.save();
    return user;
  }

  // //find an user
  // public async findUser(
  //     email: string
  // ): Promise<Auth> {
  //     let user = Auth.findOne({ where: { email: email } });
  //     return user;

  // }
}
