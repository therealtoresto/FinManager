import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';

@Entity('category')
@InputType('category_input')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: false })
  id?: number;

  @Column()
  @Field({ nullable: false })
  name: string;
}
