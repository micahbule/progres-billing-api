import { Injectable } from '@nestjs/common';
import { CreateBillableDto } from './dto/create-billable.dto';
import { UpdateBillableDto } from './dto/update-billable.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Billable } from './entities/billable.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EntityManager, FilterQuery, ref } from '@mikro-orm/core';
import { Category } from '@/category/entities/category.entity';

@Injectable()
export class BillablesService {
  constructor(
    @InjectRepository(Billable)
    private readonly billableRepository: EntityRepository<Billable>,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  async updateCategory(
    dto: CreateBillableDto | UpdateBillableDto,
    billable: Billable,
  ) {
    const category = await this.categoryRepository.findOneOrFail(dto.category);

    category.total_price = category.total_price + billable.subtotal;
    category.accomplished_amount =
      category.accomplished_amount + billable.accomplished_amount;
  }

  async create(createBillableDto: CreateBillableDto) {
    const newBillable = new Billable(createBillableDto);

    const category = await this.categoryRepository.findOneOrFail(
      createBillableDto.category,
    );

    this.updateCategory(createBillableDto, newBillable);

    newBillable.category = ref(category);

    await this.entityManager.persist(newBillable);
    await this.entityManager.flush();

    return newBillable;
  }

  async findAll(where?: FilterQuery<Billable>) {
    const billables = await this.billableRepository.find(where);
    return billables;
  }

  async findOne(id: string) {
    const billable = await this.billableRepository.findOneOrFail({ uuid: id });
    return billable;
  }

  async update(id: string, dto: UpdateBillableDto) {
    const billable = await this.billableRepository.findOneOrFail({ uuid: id });

    Object.keys(dto).forEach((dtoKey) => {
      if (!!dto[dtoKey]) {
        billable[dtoKey] = dto[dtoKey];
      }
    });

    this.updateCategory(dto, billable);

    await this.entityManager.flush();

    return billable;
  }

  async remove(id: string) {
    const billable = await this.billableRepository.findOneOrFail({ uuid: id });

    billable.deleted_at = new Date();

    await this.entityManager.flush();
  }
}
