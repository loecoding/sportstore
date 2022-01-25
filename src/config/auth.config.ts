import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  jwtSecret: string,
  jwtExpireIn: string
}


export default registerAs(
  'auth',
  async (): Promise<AuthConfig> => {

    return {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpireIn: process.env.JWT_EXPIRED,
    };
  },
);