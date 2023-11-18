import { Entity, PrimaryKey } from '@mikro-orm/core';
import { Timestamps } from './timestamps.entity';

@Entity({ abstract: true })
export abstract class BaseEntity extends Timestamps {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;
}
