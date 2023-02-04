import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Bank } from 'src/bank/bank.model';
import { BankService } from 'src/bank/bank.service';

@Resolver((of) => Bank)
export class BankResolver {
  constructor(private bankService: BankService) {}

  @Query((returns) => Bank)
  async getBank(@Args('id', { type: () => Int }) id: number) {
    return this.bankService.findOneById(id);
  }
}
