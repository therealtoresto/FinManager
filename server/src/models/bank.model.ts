import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Transaction } from 'src/models/transaction.model';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('bank')
@InputType('bank_input')
@ObjectType()
export class Bank {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: false })
  id?: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Column()
  @Field({ nullable: false })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions?: Transaction[];
}
