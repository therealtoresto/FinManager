import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from '../services/bank.service';
import { BankController } from '../controllers/bank.controller';
import { Bank } from '../models/bank.model';
import { BankResolver } from '../resolvers/bank.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  providers: [BankService, BankResolver],
  controllers: [BankController],
  exports: [BankService],
})
export class BankModule {}
