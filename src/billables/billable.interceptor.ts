import { EntityTransformerInterceptor } from '@/entity-transformer/entity-transformer.interceptor';
import { Injectable } from '@nestjs/common';
import { Billable } from './entities/billable.entity';
import { EntityDTO } from '@mikro-orm/core';

type BillablResponse = {
  scope: string;
  quantity: number;
  unit: string;
  unit_rate: number;
  subtotal: number;
  progress: number;
  accomplished_amount: number;
  category: string;
};

@Injectable()
export class BillableInterceptor extends EntityTransformerInterceptor<
  Billable,
  BillablResponse
> {
  override transform(data: EntityDTO<Billable>) {
    const { category, ...rest } = data;

    return {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      category: category.uuid as string,
    };
  }
}
