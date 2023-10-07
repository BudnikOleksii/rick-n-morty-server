import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import databaseConfig from '../../config/database.config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>
  ) {
    super({
      datasources: {
        db: {
          url: dbConfig.url,
        },
      },
    });
  }
}
