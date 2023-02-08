import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@Entity('category')
@InputType('category_input')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: false })
  id?: number;

  @Column()
  @Field({ nullable: false })
  name: string;
}
