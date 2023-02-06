import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, CategoryArgs } from './category.model';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOneById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  create(data: CategoryArgs): Promise<Category> {
    return this.categoryRepository.save(this.categoryRepository.create(data));
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async update(id: number, data: CategoryArgs): Promise<Category> {
    const category = await this.findOneById(id);
    if (!category) return;
    category.name = data.name;
    return this.categoryRepository.save(category);
  }
}
