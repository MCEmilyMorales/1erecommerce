import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Product as ProductInterface } from './fackProducts.interface';
import { Product } from "./product.entity";
import * as data from "../utils/data.json"
import { Category } from "src/categories/category.entity";

let products: ProductInterface[] = [
  {
    id: '101',
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999.99,
    stock: true,
    imgUrl: 'https://example.com/images/laptop.jpg',
  },
  {
    id: '102',
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 799.99,
    stock: true,
    imgUrl: 'https://example.com/images/smartphone.jpg',
  },
  {
    id: '103',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones',
    price: 199.99,
    stock: false,
    imgUrl: 'https://example.com/images/headphones.jpg',
  },
  {
    id: '104',
    name: 'Smartwatch',
    description: 'Feature-rich smartwatch',
    price: 299.99,
    stock: true,
    imgUrl: 'https://example.com/images/smartwatch.jpg',
  },
  {
    id: '105',
    name: 'Tablet',
    description: 'High-resolution screen tablet',
    price: 499.99,
    stock: true,
    imgUrl: 'https://example.com/images/tablet.jpg',
  },
];

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {} //base de datos de la tabla product

  async getProducts(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = await this.productRepository.find({
      skip: startIndex,
      take: endIndex,
    });
    return { startIndex, endIndex, products };
  }
  // tengo el archivo json con algunos productos para cargar, cada uno tiene un nombre, descripcion, price, stock, imgUrl y categoryId, pero el campo categoryId tiene que ir cargado con los id de la tabla de categories para no duplicar nombres
  // necesito cargar el campo de categoryId en lugar de con nombre de category, osea ejemplo mouse, con el id que corresponde a mouse, que ya lo cree y el dato se encuentra en la tabla de category
  // luego de acomodar eso subo la informacion en la base de datos
  async uploadProducts() {
    const categories = await this.categoryRepository.find();

    const products = data?.map((prod) => {
      const categoriesMap = categories.find(
        (cate) => cate.name === prod.category,
      );

      const product = new Product();
      (product.name = prod.name),
        (product.description = prod.description),
        (product.price = prod.price),
        (product.stock = prod.stock),
        (product.imgUrl = prod.imgUrl),
        (product.category = categoriesMap);
      return product;
    });

    //this.productRepository.save(products)
    return await this.productRepository.save(products);
  }

  async getProductById(id: string): Promise<ProductInterface | undefined> {
    const productId = await products.find((product) => product.id === id);
    return productId;
  }

  async createProduct(product: ProductInterface): Promise<ProductInterface> {
    let id = (products.length + 101).toString();
    const newProduct = { id, ...product };
    products.push(newProduct);
    return newProduct;
  }

  async updateProduct(
    id: string,
    updatedProduct: Partial<ProductInterface>,
  ): Promise<ProductInterface | string> {
    const productId = await products.findIndex((product) => product.id === id);
    console.log(productId);
    if (productId === -1) {
      return 'No se encontró el producto con el id indicado';
    }
    const productUnmodified = products[productId];
    const compare = { ...productUnmodified, ...updatedProduct };
    products[productId] = compare;
    return compare;
  }

  async deleteProduct(id: string): Promise<ProductInterface[]> {
    products = products.filter((product) => product.id !== id);
    return products;
  }
}
