import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Product } from "./product.entity";
import * as data from "../utils/data.json"
import { Category } from "src/categories/category.entity";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<[number, number, Product[]]> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = await this.productRepository.find({
      skip: startIndex,
      take: endIndex,
    });
    return [startIndex, endIndex, products];
  }

  async uploadProducts(): Promise<Product[]> {
    if (!data) {
      throw new BadRequestException('Los datos no fueron encontrados');
    }

    const allCategories = await this.categoryRepository.find();

    const existingProducts = await this.productRepository.find();
    if (existingProducts.length > 0) {
      throw new ConflictException('Los productos ya fueron cargados');
    }

    const mappedProducts = data?.map((productData) => {
      const matchingCategory = allCategories.find(
        (category) => category.name === productData.category,
      );
      if (!matchingCategory) {
        throw new BadRequestException('La categoria no existe');
      }

      const newProduct = new Product();
      newProduct.name = productData.name;
      newProduct.description = productData.description;
      newProduct.price = productData.price;
      newProduct.stock = productData.stock;
      newProduct.imgUrl = productData.imgUrl;
      newProduct.category = matchingCategory;

      return newProduct;
    });

    return await this.productRepository.save(mappedProducts);
  }

  async getProductById(id: string): Promise<Product | string> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async createProduct(product): Promise<Product | string> {
    const existingCategories = await this.categoryRepository.findOne({
      where: { name: product.category },
    });

    if (!existingCategories) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const newProduct = new Product();
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.stock = product.stock;
    newProduct.imgUrl = product.imgUrl;
    newProduct.category = existingCategories;

    return await this.productRepository.save(newProduct);
  }

  async updateProduct(id: string, updatedProduct): Promise<Product | string> {
    const result = await this.productRepository.update(id, updatedProduct);

    if (result.affected === 0) {
      // affect se usa para comprobar de que se encuentre el id que me comparte el cliente en la db
      throw new NotFoundException('Producto no encontrado');
    }

    return await this.productRepository.findOne({ where: { id } });
  }

  async deleteProduct(id: string): Promise<Product | string> {
    const product = await this.productRepository.findOne({ where: { id } });

    const productEliminado = await this.productRepository.delete(id);
    if (productEliminado.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }
}
