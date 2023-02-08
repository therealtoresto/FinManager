import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../models/bank.model';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
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

  async delete(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }

  async update(args: Bank): Promise<Bank> {
    const bank = await this.findOneById(args.id);
    if (!bank) return;
    bank.name = args.name;
    bank.balance = args.balance;
    return this.bankRepository.save(bank);
  }
}
