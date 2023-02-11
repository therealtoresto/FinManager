import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { StatisticsOutput } from 'src/models/statistics.model';
import { StatisticsService } from 'src/services/statistics.service';

@Resolver(() => StatisticsOutput)
export class StatisticsResolver {
  constructor(private statisticsService: StatisticsService) {}

  @Query(() => [StatisticsOutput], { name: 'getStatisctics' })
  async getStatistics(
    @Args({ name: 'ids', type: () => [Int] })
    ids: number[],
    @Args({ name: 'from', type: () => Date })
    from: Date,
    @Args({ name: 'to', type: () => Date })
    to: Date,
  ): Promise<StatisticsOutput[]> {
    return await this.statisticsService.getStatistics({ ids, from, to });
  }
}
