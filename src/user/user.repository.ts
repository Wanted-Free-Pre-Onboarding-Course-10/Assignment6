import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/sign.up.dto';
import * as moment from 'moment';
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findUserByName(username: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.username = :username', {
        username,
      })
      .getOne();

    return user;
  }

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

  async setLastUsedTime(id: number) {
    try {
      const lastAt = new Date();
      // const lastMoment = moment(lastAt, 'YYYYMMDDHHmm');
      const user = await this.findOne(id);
      user.returnTime = lastAt;
      await this.save(user);
      console.log(user)
    } catch (error) {
      throw error;
    }
  }
}
