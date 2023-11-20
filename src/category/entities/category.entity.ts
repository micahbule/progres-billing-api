import { Entity, ManyToOne, OneToOne, Property, Ref } from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { Contract } from '../../contracts/entities/contract.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Entity({
  tableName: 'categories',
})
export class Category extends BaseEntity {
  constructor(dto?: CreateCategoryDto) {
    super();

    if (typeof dto !== 'undefined') {
      const {
        parent_category: _parent_category,
        contract: _contract,
        ...rest
      } = dto;

      for (const key in rest) {
        this[key] = dto[key];
      }
    }
  }

  @Property()
  name: string;

  @Property()
  total_price: number = 0;

  @Property()
  evaluated_percentage: number = 0;

  @Property()
  accomplished_amount: number = 0;

  @Property()
  is_parent: boolean = false;

  @OneToOne(() => Category, { nullable: true, ref: true })
  parent_category?: Ref<Category>;

  @ManyToOne(() => Contract, { ref: true })
  contract: Contract;
}
