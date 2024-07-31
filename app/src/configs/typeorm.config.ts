import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from 'env-var';

import { AccountSchema } from 'app/modules/account/account.schema';

export const typeorm_config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.get('DATABASE_HOST').required().asString(),
  username: env.get('DATABASE_USER').required().asString(),
  database: env.get('DATABASE_DB').required().asString(),
  port: env.get('DATABASE_PORT').required().default(5432).asPortNumber(),
  password: env.get('DATABASE_PASSWORD').required().asString(),
  synchronize: true,
  migrationsRun: false,
  entities: [AccountSchema],
} as const;
