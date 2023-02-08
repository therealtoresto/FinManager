import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findAllById(ids: Array<number>): Promise<Category[]> {
    return this.categoryRepository.findBy({ id: In(ids) });
  }

  findOneById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  create(args: Category): Promise<Category> {
    return this.categoryRepository.save(this.categoryRepository.create(args));
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async update(args: Category): Promise<Category> {
    const category = await this.findOneById(args.id);
    if (!category) return;
    category.name = args.name;
    return this.categoryRepository.save(category);
  }
}
