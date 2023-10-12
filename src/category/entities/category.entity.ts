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
  total_price: number;

  @Property()
  evaluated_percentage: number;

  @Property()
  accomplished_amount: number;

  @OneToOne()
  parent_category: Category;

  @ManyToOne()
  contract: Contract;
}
