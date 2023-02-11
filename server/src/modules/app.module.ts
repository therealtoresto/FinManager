import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../models/bank.model';
import { BankModule } from './bank.module';
import { join } from 'path';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { CategoryModule } from './category.module';
import { TransactionModule } from './transaction.module';
import { StatisticsModule } from './statistics.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fin_manager',
      entities: [Bank, Transaction, Category],
      synchronize: true,
    }),
    BankModule,
    CategoryModule,
    TransactionModule,
    StatisticsModule,
  ],
})
export class AppModule {}
