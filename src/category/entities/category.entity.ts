import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { Contract } from '../../contracts/entities/contract.entity';

@Entity({
  tableName: 'categories',
})
export class Category extends BaseEntity {
  @Property()
  name: string;

  @Property()
  total_price = 0;

  @Property()
  evaluated_percentage = 0;

  @Property()
  accomplished_amount = 0;

  @Property()
  is_parent = false;

  @OneToOne({ nullable: true })
  parent_category?: Category;

  @ManyToOne()
  contract: Contract;
}
