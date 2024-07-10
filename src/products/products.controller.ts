import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard)
  getProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 5;
    return this.productsService.getProducts(pageNumber, limitNumber);
  }

  @Get('seeder')
  uploadProducts() {
    return this.productsService.uploadProducts();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product) {
    return this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatedProduct,
  ) {
    return this.productsService.updateProduct(id, updatedProduct);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
