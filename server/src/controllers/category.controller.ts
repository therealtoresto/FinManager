import { Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Post('create')
  createCategory(args: Category): Promise<Category> {
    return this.categoryService.create(args);
  }

  @Post('delete')
  deleteCategory(id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }

  @Post('update')
  updateCategory(args: Category): Promise<Category> {
    return this.categoryService.update(args);
  }
}
