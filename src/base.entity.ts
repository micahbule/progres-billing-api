import { Entity, PrimaryKey } from '@mikro-orm/core';
import { Timestamps } from './timestamps.entity';
import { CreateContractDto } from './contracts/dto/create-contract.dto';
import { CreateCategoryDto } from './category/dto/create-category.dto';

type ValidDto = CreateContractDto | CreateCategoryDto;

@Entity({ abstract: true })
export abstract class BaseEntity extends Timestamps {
  constructor(dto?: ValidDto) {
    super();

    if (typeof dto !== 'undefined') {
      for (const key in dto) {
        this[key] = dto[key];
      }
    }
  }

  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;
}
