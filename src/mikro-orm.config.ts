import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { Timestamps } from './timestamps.entity';
import { Contract } from './contracts/entities/contract.entity';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [BaseEntity, Timestamps, Contract],
  dbName: 'progress-billing',
  type: 'postgresql',
  debug: true,
  logger: logger.log.bind(logger),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default function getConfig(configService: ConfigService): Options {
  return {
    ...config,
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
  };
}
