import { Module, forwardRef } from '@nestjs/common';
import { StatisticsService } from 'src/services/statistics.service';
import { StatisticsResolver } from 'src/resolvers/statistics.resolver';
import { StatisticsController } from 'src/controllers/statistics.controller';
import { CategoryModule } from './category.module';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [
    forwardRef(() => TransactionModule),
    forwardRef(() => CategoryModule),
  ],
  providers: [StatisticsService, StatisticsResolver],
  controllers: [StatisticsController],
  exports: [],
})
export class StatisticsModule {}
