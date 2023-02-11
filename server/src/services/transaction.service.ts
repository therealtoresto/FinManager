import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
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
    @Inject(forwardRef(() => BankService))
    private bankService: BankService,
    @Inject(forwardRef(() => CategoryService))
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

  findOneByBankId(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ bank: { id } });
  }

  findOneByCategoryId(id: number): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ categories: { id } });
  }

  findAllByDateAndCategoriesIds(
    ids: number[],
    from: Date,
    to: Date,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        createdAt: Between(from, to),
        categories: { id: In(ids) },
      },
    });
  }

  async create(
    @Args({ type: () => TransactionCreateInput })
    input: TransactionCreateInput,
  ): Promise<Transaction> {
    const { amount, type, bankId, categoriesIds } = input;
    const bank = await this.bankService.findOneById(bankId);
    let balance = bank.balance;
    const categories = await this.categoryService.findAllById(categoriesIds);
    const transaction: any = await this.transactionRepository.save(
      this.transactionRepository.create({
        amount,
        type,
        bank,
        categories,
      } as any),
    );
    if (type === 'consumable') {
      balance -= amount;
    } else if (type === 'profitable') {
      balance += amount;
    } else
      throw new Error(
        'Transaction type is not correct. Try `consumable` or `profitable`',
      );
    await this.bankService.update({
      id: bank.id,
      name: bank.name,
      balance: balance,
    });
    return transaction;
  }

  async delete(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async getStatistics(
    categoryIds: number[],
    fromPeriod: Date,
    toPeriod: Date,
  ): Promise<Map<string, number>> {
    const transactions = await this.transactionRepository.find({
      where: {
        createdAt: Between(fromPeriod, toPeriod),
        categories: { id: In(categoryIds) },
      },
    });
    const result = new Map<string, number>();
    transactions.forEach(async (tran) => {
      (await tran.categories).forEach((category) => {
        if (!categoryIds.includes(category.id)) return;
        if (!result[category.name]) result[category.name] = 0;
        else if (tran.type === 'consumable')
          result[category.name] -= result[category.name];
        else result[category.name] += result[category.name];
      });
    });
    return result;
  }
}
