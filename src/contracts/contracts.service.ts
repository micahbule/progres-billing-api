import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Contract } from './entities/contract.entity';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: EntityRepository<Contract>,
    private entityManager: EntityManager,
  ) {}

  async create(createContractDto: CreateContractDto) {
    const newContract = new Contract(createContractDto);

    await this.entityManager.persistAndFlush(newContract);

    return newContract;
  }

  async findAll(where?: FilterQuery<Contract>) {
    const contracts = await this.contractRepository.find(where);
    return contracts;
  }

  async findOne(id: string) {
    const contract = await this.contractRepository.findOneOrFail({ uuid: id });
    return contract;
  }

  async update(id: string, dto: UpdateContractDto) {
    const contract = await this.contractRepository.findOneOrFail({ uuid: id });

    Object.keys(dto).forEach((dtoKey) => {
      if (!!dto[dtoKey]) {
        contract[dtoKey] = dto[dtoKey];
      }
    });

    await this.entityManager.flush();

    return contract;
  }

  async remove(id: string) {
    const contract = await this.contractRepository.findOneOrFail({ uuid: id });

    contract.deleted_at = new Date();

    await this.entityManager.flush();
  }
}
