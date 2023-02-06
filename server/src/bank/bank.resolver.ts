import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Bank, BankArgs } from 'src/bank/bank.model';
import { BankService } from 'src/bank/bank.service';

@Resolver(() => Bank)
export class BankResolver {
  constructor(private bankService: BankService) {}

  @Query(() => Bank, { name: 'getBankById' })
  async getBankById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Bank> {
    return this.bankService.findOneById(id);
  }

  @Query(() => [Bank], { name: 'getBanks' })
  async getBanks(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Mutation(() => Bank, { name: 'createBank' })
  async createBank(@Args() args: BankArgs): Promise<Bank> {
    return this.bankService.create(args);
  }

  @Mutation(() => Bank, { name: 'deleteBank' })
  async deleteBank(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.bankService.delete(id);
  }

  @Mutation(() => Bank, { name: 'updateBank' })
  async updateBank(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args() args: BankArgs,
  ): Promise<Bank> {
    return this.bankService.update(id, args);
  }
}
