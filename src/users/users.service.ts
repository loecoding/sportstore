import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export type UserWithoutPassword = Pick<User, Exclude<keyof User, 'password'>>;

@Injectable()
export class UsersService {
  async add(user: any): Promise<any> {
    console.log(user);
    return user;
  }
}
