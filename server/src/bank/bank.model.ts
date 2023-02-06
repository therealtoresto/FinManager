import { Field, ID, ObjectType, ArgsType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@ObjectType({ description: 'bank' })
export class Bank {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  balance: number;
}
@ArgsType()
export class BankArgs {
  @Field()
  @MinLength(1)
  name: string;

  @Field()
  balance: number;
}
