import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { Bank } from './bank.entity';
import { BankResolver } from './bank.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  providers: [BankService, BankResolver],
  controllers: [BankController],
})
export class BankModule {}
