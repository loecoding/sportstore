import { Injectable } from '@nestjs/common';

export type User = {
  id : number;
  username: string;
  password: string
  role: string
};

export type UserWithoutPassword = Pick< User , Exclude <keyof User, 'password'>>

@Injectable()
export class UsersService {
    private readonly users = [
        {
          id: 1,
          username: 'john',
          password: '123456',
          role: 'admin'
        },
        {
          id: 2,
          username: 'mark',
          password: '654321',
          role: 'user'
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
