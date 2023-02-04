import { Controller, Get, Post } from '@nestjs/common';
import { BankService } from './bank.service';
import { Bank } from './bank.entity';

@Controller()
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  getHello(): string {
    return 'Hello!!!';
  }

  @Post()
  createNewBank(bank: Bank): Promise<void> {
    return this.createNewBank(bank);
  }
}
