import { registerAs } from '@nestjs/config';

export interface ServerConfig {
  port: number;
  apiEntrypoint: string;
  adminRole: string;
  userRole: string;
  saltRounds: number;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export default registerAs(
  'server',
  (): ServerConfig => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
    apiEntrypoint: '/api',
    adminRole: 'ADMIN',
    userRole: 'USER',
    saltRounds: 7,
    accessTokenExpiresIn: '10m',
    refreshTokenExpiresIn: '30d',
  })
);
