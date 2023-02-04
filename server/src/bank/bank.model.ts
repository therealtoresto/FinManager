import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'bank' })
export class Bank {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  balance: number;
}
