import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  DATABASE_DB,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from 'app/configs/constants';

export const typeorm_config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  username: DATABASE_USER,
  database: DATABASE_DB,
  port: DATABASE_PORT,
  password: DATABASE_PASSWORD,
  synchronize: true,
  migrationsRun: false,
  autoLoadEntities: true,
} as const;
