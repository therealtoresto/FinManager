import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { Bank } from '../models/bank.model';
import { BankService } from '../services/bank.service';

@Resolver(() => Bank)
export class BankResolver {
  constructor(private bankService: BankService) {}

  @Query(() => Bank, { name: 'getBankById' })
  async getBankById(@Args('id', { type: () => ID }) id: number): Promise<Bank> {
    return this.bankService.findOneById(id);
  }

  @Query(() => [Bank], { name: 'getBanks' })
  async getBanks(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Mutation(() => Bank, { name: 'createBank' })
  async createBank(
    @Args('name') name: string,
    @Args('balance') balance: number,
  ): Promise<Bank> {
    return this.bankService.create({ name, balance });
  }

  @Mutation(() => Bank, { name: 'deleteBank' })
  async deleteBank(@Args({ name: 'id', type: () => ID }) id: number) {
    return this.bankService.delete(id);
  }

  @Mutation(() => Bank, { name: 'updateBank' })
  async updateBank(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'balance', type: () => Float }) balance: number,
  ): Promise<Bank> {
    return this.bankService.update({ id, name, balance });
  }
}
