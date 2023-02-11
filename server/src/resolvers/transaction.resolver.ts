import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  Transaction,
  TransactionCreateInput,
} from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Query(() => [Transaction], { name: 'getTransactions' })
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Mutation(() => Transaction, { name: 'createTransaction' })
  async createTransaction(
    @Args({ name: 'transaction', type: () => TransactionCreateInput })
    input: TransactionCreateInput,
  ): Promise<Transaction> {
    return await this.transactionService.create(input);
  }

  @Mutation(() => Transaction, { name: 'deleteTransaction' })
  async deleteTransaction(@Args({ name: 'id', type: () => Int }) id: number) {
    await this.transactionService.delete(id);
    return { id };
  }
}
