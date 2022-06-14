import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './Category.service';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id) {
    return await this.categoriesService.getCategory(id);
  }

}