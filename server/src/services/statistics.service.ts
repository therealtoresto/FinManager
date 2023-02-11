import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { StatisticsInput, StatisticsOutput } from 'src/models/statistics.model';
import { TransactionService } from './transaction.service';
@Injectable()
export class StatisticsService {
  constructor(
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
  ) {}

  async getStatistics({
    ids,
    from,
    to,
  }: StatisticsInput): Promise<StatisticsOutput[]> {
    const transactions =
      await this.transactionService.findAllByDateAndCategoriesIds(
        ids,
        from,
        to,
      );
    const result: StatisticsOutput[] = [];
    for (const transaction of transactions) {
      for (const category of await transaction.categories) {
        if (!ids.includes(category.id)) continue;
        for (const elem of result) {
          if (elem.name === category.name) {
            if (transaction.type === 'consumable') {
              elem.value -= elem.value;
            } else {
              elem.value += elem.value;
            }
            break;
          }
        }
        result.push({ name: category.name, value: transaction.amount });
      }
    }
    console.log(result);
    return result;
  }
}
