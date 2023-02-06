import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './bank.entity';
import { BankArgs } from './bank.model';

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

  create(data: BankArgs): Promise<Bank> {
    return this.bankRepository.save(this.bankRepository.create(data));
  }

  async delete(id: number): Promise<void> {
    await this.bankRepository.delete(id);
  }

  async update(id: number, data: BankArgs): Promise<Bank> {
    const bank = await this.findOneById(id);
    if (!bank) return;
    bank.name = data.name;
    bank.balance = data.balance;
    return this.bankRepository.save(bank);
  }
}
