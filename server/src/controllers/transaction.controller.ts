import { Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  Transaction,
  TransactionCreateInput,
} from '../models/transaction.model';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all/:take?/:skip?')
  getTransactions(
    @Param('take') take?: number,
    @Param('skip') skip?: number,
  ): Promise<Transaction[]> {
    console.log('resolver', take, skip);
    return this.transactionService.findAll({ take, skip });
  }

  @Post('create')
  createTransaction(args: TransactionCreateInput): Promise<Transaction> {
    return this.transactionService.create(args);
  }

  @Post('delete')
  deleteTransaction(id: number): Promise<void> {
    return this.transactionService.delete(id);
  }
}
