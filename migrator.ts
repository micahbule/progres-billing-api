import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import getConfig from './src/mikro-orm.config';
import { ConfigService } from '@nestjs/config';
import { rmdir } from 'fs/promises';

(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await rmdir('./src/migrations', { recursive: true, force: true });
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const orm = await MikroORM.init(getConfig(configService));
  const migrator = orm.getMigrator();

  await migrator.down();
  await migrator.createMigration();
  await migrator.up();

  await orm.close(true);
})();
