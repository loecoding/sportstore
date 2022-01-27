import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwt-payload';


export const UserAuth = createParamDecorator(
  (_ , context: ExecutionContext): JwtPayload => {
    const { user } = context.switchToHttp().getRequest();
    return user;
  },
);