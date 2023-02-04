import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './bank.entity';

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

  async delete(id: string): Promise<void> {
    await this.bankRepository.delete(id);
  }

  async createBank(bank: Bank): Promise<void> {
    this.bankRepository.create(bank);
  }
}
