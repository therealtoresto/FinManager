import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../models/bank.model';
import { TransactionService } from './transaction.service';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
  ) {}

  findAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  findOneById(id: number): Promise<Bank> {
    return this.bankRepository.findOneBy({ id });
  }

  async create(args: Bank): Promise<Bank> {
    return await this.bankRepository.save(this.bankRepository.create(args));
  }

  async delete(id: number): Promise<Bank> {
    const bank = await this.bankRepository.findOneBy({ id });
    const transaction = await this.transactionService.findOneByBankId(id);
    if (transaction)
      throw new Error('You can`t delete bank if it has any transactions');
    await this.bankRepository.delete(id);
    return bank;
  }

  async update(args: Bank): Promise<Bank> {
    const bank = await this.findOneById(args.id);
    if (!bank) return;
    bank.name = args.name;
    bank.balance = args.balance;
    return this.bankRepository.save(bank);
  }
}
