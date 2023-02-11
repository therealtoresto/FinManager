import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  FetchTransactionsArgs,
  Transaction,
  TransactionCreateInput,
} from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Query(() => [Transaction], {
    name: 'getTransactions',
  })
  async getTransactions(
    @Args({ name: 'args', type: () => FetchTransactionsArgs })
    args: FetchTransactionsArgs,
  ): Promise<Transaction[]> {
    return this.transactionService.findAll(args);
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
