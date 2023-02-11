import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Field,
  Int,
  ObjectType,
  InputType,
  Float,
  ArgsType,
} from '@nestjs/graphql';
import { Category } from 'src/models/category.model';
import { Bank } from 'src/models/bank.model';

export type Type = 'profitable' | 'consumable';

@Entity('transaction')
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id?: number;

  @Column()
  @Field(() => Float, { nullable: false })
  amount: number;

  @Column()
  @Field({ nullable: false })
  type: Type;

  @ManyToOne(() => Bank, (bank) => bank.transactions, { cascade: true })
  @Field(() => Bank)
  bank: Promise<Bank>;

  @ManyToMany(() => Category)
  @JoinTable()
  @Field(() => [Category])
  categories?: Promise<Category[]>;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}

@InputType('transaction_input')
export class TransactionCreateInput {
  @Field(() => Float)
  amount: number;

  @Field()
  type: Type;

  @Field(() => Int)
  bankId: number;

  @Field(() => [Int])
  categoriesIds: number[];
}

@InputType('transaction_args')
export class FetchTransactionsArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 25;
}
