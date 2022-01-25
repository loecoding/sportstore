import { Injectable } from '@nestjs/common';

export type User = {
  id : number;
  username: string;
  password: string
};

@Injectable()
export class UsersService {
    private readonly users = [
        {
          id: 1,
          username: 'john',
          password: '123456',
        },
        {
          id: 2,
          username: 'mark',
          password: '654321',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
