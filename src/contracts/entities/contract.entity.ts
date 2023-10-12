import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';

@Entity({
  tableName: 'contracts',
})
export class Contract extends BaseEntity {
  @Property()
  name: string;
}
