import { Controller, Get, Post } from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { Bank } from '../models/bank.model';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  getBanks(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Get(':id')
  getBank(id: number): Promise<Bank> {
    return this.bankService.findOneById(id);
  }

  @Post()
  createBank(args: Bank): Promise<Bank> {
    return this.bankService.create(args);
  }

  @Post()
  deleteBank(id: number): Promise<Bank> {
    return this.bankService.delete(id);
  }

  @Post()
  updateBank(args: Bank): Promise<Bank> {
    return this.bankService.update(args);
  }
}
