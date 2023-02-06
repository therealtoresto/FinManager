import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';
import { Category } from 'src/category/category.model';
import { Bank } from 'src/bank/bank.entity';

type Type = 'profitable' | 'consumable';

@Entity('transaction')
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  amount: number;

  @Column()
  @Field({ nullable: false })
  type: Type;

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  bank: Bank;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

@InputType()
export class TransactionArgs {
  @Field({ nullable: false })
  amount: number;

  @Field({ nullable: false })
  type: Type;
}
