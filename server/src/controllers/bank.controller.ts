import { Controller, Get, Param, Post } from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { Bank } from '../models/bank.model';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('all')
  getBanks(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Get(':id')
  getBank(@Param('id') id: number): Promise<Bank> {
    return this.bankService.findOneById(id);
  }

  @Post('create')
  createBank(args: Bank): Promise<Bank> {
    return this.bankService.create(args);
  }

  @Post('delete')
  deleteBank(id: number): Promise<Bank> {
    return this.bankService.delete(id);
  }

  @Post('update')
  updateBank(args: Bank): Promise<Bank> {
    return this.bankService.update(args);
  }
}
