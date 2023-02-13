import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../models/bank.model';
import { BankModule } from './bank.module';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { CategoryModule } from './category.module';
import { TransactionModule } from './transaction.module';
import { StatisticsModule } from './statistics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: parseInt(configService.get('TYPEORM_PORT')),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        // entities: [Bank, Transaction, Category],
        entities: [__dirname + 'dist/**/*.model.ts'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    BankModule,
    CategoryModule,
    TransactionModule,
    StatisticsModule,
  ],
})
export class AppModule {}
