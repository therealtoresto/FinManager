import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from '../services/transaction.service';
import { TransactionController } from '../controllers/transaction.controller';
import { Transaction } from '../models/transaction.model';
import { TransactionResolver } from '../resolvers/transaction.resolver';
import { BankModule } from './bank.module';
import { CategoryModule } from './category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    BankModule,
    CategoryModule,
  ],
  providers: [TransactionService, TransactionResolver],
  controllers: [TransactionController],
})
export class TransactionModule {}
