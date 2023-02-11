import { Controller, Get } from '@nestjs/common';
import { StatisticsInput, StatisticsOutput } from 'src/models/statistics.model';
import { StatisticsService } from 'src/services/statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(statistics: StatisticsInput): Promise<StatisticsOutput[]> {
    return this.statisticsService.getStatistics(statistics);
  }
}
