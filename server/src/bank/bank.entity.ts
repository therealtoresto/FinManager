import { Transaction } from 'src/transaction/transaction.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.bank)
  transactions: Transaction[];
}
