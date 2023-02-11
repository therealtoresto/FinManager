import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getCategory(id: number): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Post()
  createCategory(args: Category): Promise<Category> {
    return this.categoryService.create(args);
  }

  @Post()
  deleteCategory(id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }

  @Post()
  updateCategory(args: Category): Promise<Category> {
    return this.categoryService.update(args);
  }
}
