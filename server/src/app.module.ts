import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './bank/bank.entity';
import { BankModule } from './bank/bank.module';
import { join } from 'path';
import { Transaction } from './transaction/transaction.model';
import { Category } from './category/category.model';

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
  ],
})
export class AppModule {}
