import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import getConfig from './src/mikro-orm.config';
import { ConfigService } from '@nestjs/config';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const orm = await MikroORM.init(getConfig(configService));
  const migrator = orm.getMigrator();

  await migrator.down();

  await orm.close(true);
  process.exit(0);
})();
