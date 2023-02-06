import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@Entity('category')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;
}

@InputType()
export class CategoryArgs {
  @Field({ nullable: false })
  name: string;
}
