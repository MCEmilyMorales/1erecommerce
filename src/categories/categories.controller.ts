import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  async addCategories() {
    return await this.categoriesService.addCategories();
  }
  @Get()
  getCategories(){
    return this.categoriesService.getCategories()
  }
}
