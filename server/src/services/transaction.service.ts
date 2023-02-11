import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import {
  FetchTransactionsArgs,
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

  async findAll(query: FetchTransactionsArgs): Promise<Transaction[]> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const result = this.transactionRepository.find({
      relations: {
        bank: true,
        categories: true,
      },
      take: take,
      skip: skip,
    });

    return result;
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
}
