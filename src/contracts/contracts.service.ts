import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Contract } from './entities/contract.entity';
import {
  EntityManager,
  EntityRepository,
  FilterQuery,
  wrap,
} from '@mikro-orm/core';

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

    return wrap(newContract).toObject();
  }

  findAll(where?: FilterQuery<Contract>) {
    // const contracts = await this.contractRepository.find(where);
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
