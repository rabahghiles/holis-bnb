import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './Category.service';

@Controller('categories')
export class CategoryController {

  constructor(private readonly locationService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.locationService.getCategories();
  }

}