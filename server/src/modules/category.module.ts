import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { Category } from '../models/category.model';
import { CategoryResolver } from '../resolvers/category.resolver';
import { TransactionModule } from './transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => TransactionModule),
  ],
  providers: [CategoryService, CategoryResolver],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
