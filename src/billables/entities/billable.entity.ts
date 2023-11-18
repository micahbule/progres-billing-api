import { Entity, ManyToOne, Property, Ref } from '@mikro-orm/core';
import { BaseEntity } from '@/base.entity';
import { Category } from '@/category/entities/category.entity';
import { CreateBillableDto } from '@/billables/dto/create-billable.dto';

@Entity({
  tableName: 'billables',
})
export class Billable extends BaseEntity {
  constructor(dto?: CreateBillableDto) {
    super();

    if (typeof dto !== 'undefined') {
      const { category: _category, ...rest } = dto;

      for (const key in rest) {
        this[key] = dto[key];
      }

      const {
        quantity,
        unit_rate: unitRate,
        accomplished_amount: accomplishedAmount,
      } = dto;
      const subtotal = quantity * unitRate;

      this.subtotal = subtotal;

      if (typeof accomplishedAmount !== 'undefined') {
        this.progress = (accomplishedAmount / subtotal) * 100;
      }
    }
  }

  @Property()
  scope: string;

  @Property()
  quantity: number = 0;

  @Property()
  unit: string;

  @Property()
  unit_rate: number = 0;

  @Property()
  subtotal: number = 0;

  @Property()
  progress: number = 0;

  @Property()
  accomplished_amount: number = 0;

  @ManyToOne(() => Category, { ref: true })
  category: Ref<Category>;
}
