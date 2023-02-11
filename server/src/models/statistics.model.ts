import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class StatisticsOutput {
  @Field(() => String)
  name: string;
  @Field(() => Float)
  value: number;
}

@ObjectType()
export class StatisticsInput {
  @Field(() => [Int])
  ids: number[];

  @Field(() => Date)
  from: Date;

  @Field(() => Date)
  to: Date;
}
