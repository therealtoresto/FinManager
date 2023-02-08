import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType, InputType, ID } from '@nestjs/graphql';
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
  @Field({ nullable: false })
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
}

@InputType('transaction_input')
export class TransactionCreateInput {
  @Field()
  amount: number;

  @Field()
  type: Type;

  @Field()
  bankId: number;

  @Field(() => [ID])
  categoriesIds: number[];
}
