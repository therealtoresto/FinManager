import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from '../models/category.model';
import { TransactionService } from './transaction.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
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

  async delete(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    const transaction = await this.transactionService.findOneByCategoryId(id);
    if (transaction)
      throw new Error(
        'You can`t delete category if it has relations with any transactions',
      );
    await this.categoryRepository.delete(id);
    return category;
  }

  async update(args: Category): Promise<Category> {
    const category = await this.findOneById(args.id);
    if (!category) return;
    category.name = args.name;
    return this.categoryRepository.save(category);
  }
}
