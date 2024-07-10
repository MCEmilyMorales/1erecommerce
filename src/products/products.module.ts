import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, OrderDetails])],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
