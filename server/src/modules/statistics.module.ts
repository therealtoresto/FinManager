import { Module, forwardRef } from '@nestjs/common';
import { StatisticsService } from 'src/services/statistics.service';
import { StatisticsResolver } from 'src/resolvers/statistics.resolver';
import { StatisticsController } from 'src/controllers/statistics.controller';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [forwardRef(() => TransactionModule)],
  providers: [StatisticsService, StatisticsResolver],
  controllers: [StatisticsController],
  exports: [],
})
export class StatisticsModule {}
