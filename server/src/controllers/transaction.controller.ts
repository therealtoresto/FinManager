import { Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import {
  Transaction,
  TransactionCreateInput,
} from '../models/transaction.model';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Post()
  createTransaction(args: TransactionCreateInput): Promise<Transaction> {
    return this.transactionService.create(args);
  }

  @Post()
  deleteTransaction(id: number): Promise<void> {
    return this.transactionService.delete(id);
  }
}
