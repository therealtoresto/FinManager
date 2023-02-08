import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category, { name: 'getCategoryById' })
  async getCategoryById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Query(() => [Category], { name: 'getCategories' })
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category, { name: 'createCategory' })
  async createCategory(@Args('name') name: string): Promise<Category> {
    return this.categoryService.create({ name });
  }

  @Mutation(() => Category, { name: 'deleteCategory' })
  async deleteCategory(@Args({ name: 'id', type: () => ID }) id: number) {
    await this.categoryService.delete(id);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  async updateCategory(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'name', type: () => String }) name: string,
  ): Promise<Category> {
    return this.categoryService.update({ id, name });
  }
}
