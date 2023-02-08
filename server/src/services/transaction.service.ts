import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Transaction,
  TransactionCreateInput,
} from '../models/transaction.model';
import { BankService } from './bank.service';
import { Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @Inject(BankService)
    private bankService: BankService,
    @Inject(CategoryService)
    private categoryService: CategoryService,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      relations: {
        bank: true,
        categories: true,
      },
    });
  }

  async create(
    @Args({ type: () => TransactionCreateInput })
    input: TransactionCreateInput,
  ): Promise<Transaction> {
    const { amount, type, bankId, categoriesIds } = input;
    const bank = await this.bankService.findOneById(bankId);
    const categories = await this.categoryService.findAllById(categoriesIds);
    const transaction: any = await this.transactionRepository.save(
      this.transactionRepository.create({
        amount,
        type,
        bank,
        categories,
      } as any),
    );
    return transaction;
  }

  async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
