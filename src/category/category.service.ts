import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from './entities/category.entity';
import { EntityManager, EntityRepository, FilterQuery } from '@mikro-orm/core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new Category(createCategoryDto);

    if (typeof createCategoryDto.parent_category !== 'undefined') {
      const parentCategory = await this.categoryRepository.findOneOrFail(
        createCategoryDto.parent_category,
      );

      if (!parentCategory.is_parent) {
        parentCategory.is_parent = true;
      }
    }

    await this.entityManager.persist(newCategory);
    await this.entityManager.flush();

    return newCategory;
  }

  async findAll(where?: FilterQuery<Category>) {
    const categories = await this.categoryRepository.find(where);
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneOrFail({ uuid: id });
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneOrFail({ uuid: id });

    Object.keys(dto).forEach((dtoKey) => {
      if (!!dto[dtoKey]) {
        category[dtoKey] = dto[dtoKey];
      }
    });

    await this.entityManager.flush();

    return category;
  }

  async remove(id: string) {
    const contract = await this.categoryRepository.findOneOrFail({ uuid: id });

    contract.deleted_at = new Date();

    await this.entityManager.flush();
  }
}
