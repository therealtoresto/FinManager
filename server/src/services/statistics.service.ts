import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { StatisticsInput, StatisticsOutput } from 'src/models/statistics.model';
import { TransactionService } from './transaction.service';
@Injectable()
export class StatisticsService {
  constructor(
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
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
    // console.log(transactions);
    const result: StatisticsOutput[] = [];
    for (const transaction of transactions) {
      for (const category of await transaction.categories) {
        console.log(category, ids);
        if (!ids.includes(category.id)) continue;
        console.log(category);
        for (const elem of result) {
          console.log(elem, result, category);
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
      // if (!result[category.name]) result[category.name] = 0;
      // else if (tran.type === 'consumable')
      //   result[category.name] -= result[category.name];
      // else result[category.name] += result[category.name];
    }
    console.log(result);
    // return [{ categories, balance }];
    return result;
  }
}
