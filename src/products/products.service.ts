import { Injectable } from '@nestjs/common';

import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(page: number, limit: number) {
    return await this.productsRepository.getProducts(page, limit);
  }

  async getProductById(id: string) {
    return await this.productsRepository.getProductById(id);
  }

  async uploadProducts() {
    return await this.productsRepository.uploadProducts();
  }

  createProduct(product) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: string, updatedProduct) {
    return this.productsRepository.updateProduct(id, updatedProduct);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }
}
