import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface ServerConfig {
  port: number;
  apiEntrypoint: string;
  adminRole: string;
  userRole: string;
  saltRounds: number;
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
  apiUrl: string;
  clientUrl: string;
}

const apiEntrypoint = '/api';
const apiUrl = 'http://localhost:8080' + apiEntrypoint;

export default registerAs(
  'server',
  (): ServerConfig => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
    apiEntrypoint,
    adminRole: 'ADMIN',
    userRole: 'USER',
    saltRounds: 7,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: '10m',
    refreshExpiresIn: '7d',
    apiUrl,
    clientUrl: 'http://localhost:3000',
  })
);
