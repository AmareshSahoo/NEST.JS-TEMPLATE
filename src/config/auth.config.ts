import { registerAs } from '@nestjs/config';

export default registerAs('auth', ():  Record<string, any> => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
}));

