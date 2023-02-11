import { Field, ObjectType, InputType, Float, Int } from '@nestjs/graphql';
import { Transaction } from 'src/models/transaction.model';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('bank')
@InputType('bank_input')
@ObjectType()
export class Bank {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: false })
  id?: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field(() => Float, { nullable: false })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions?: Transaction[];
}
