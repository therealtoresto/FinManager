import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionArgs } from './transaction.model';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  create(data: TransactionArgs): Promise<Transaction> {
    return this.transactionRepository.save(
      this.transactionRepository.create(data),
    );
  }

  async delete(id: number): Promise<Transaction[]> {
    await this.transactionRepository.delete(id);
    return this.transactionRepository.find();
  }
}
