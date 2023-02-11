import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from '../services/bank.service';
import { BankController } from '../controllers/bank.controller';
import { Bank } from '../models/bank.model';
import { BankResolver } from '../resolvers/bank.resolver';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bank]),
    forwardRef(() => TransactionModule),
  ],
  providers: [BankService, BankResolver],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule {}
