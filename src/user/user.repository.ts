import { EntityRepository, Repository, } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/sign.up.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto) {
    const createdUser = this.create(signUpDto);
    try {
      const savedUser = await this.save(createdUser);
      return {
        id: savedUser.id,
      };
    } catch (err) {
      throw err;
    }
  }

  async signIn(username: string) {
    try {
      return await this.findOne({ username });
    } catch (err) {
      throw err;
    }
  }

  async getLastUsedTime(id: number) {
    try {
      const user = await this.findOne(id);
      return user.returnTime;
    } catch (error) {
      throw error;
    }
  }

}