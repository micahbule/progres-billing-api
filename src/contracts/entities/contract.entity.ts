import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { CreateContractDto } from '../dto/create-contract.dto';

@Entity({
  tableName: 'contracts',
})
export class Contract extends BaseEntity {
  constructor(dto?: CreateContractDto) {
    super();

    if (typeof dto !== 'undefined') {
      this.name = dto.name;
    }
  }

  @Property()
  name: string;
}
