import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(userId, products) {
    console.log(`Buscando usuario con ID: ${userId}`);
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      console.error('Id usuario no encontrado...');
      return 'Id usuario no encontrado...';
    }
    console.log('Usuario encontrado:', user);

    const orders = new Order();
    orders.date = new Date();
    orders.user = user;
    await this.orderRepository.save(orders);
    console.log('Order guardada:', orders);

    let total = 0;

    const detalle = new OrderDetails();
    detalle.orders = orders;
    detalle.product = [];

    if (products && products.length > 0) {
      await Promise.all(
        products.map(async (product) => {
          // Aquí asumimos que `product` es un objeto con un campo `id`
          const idProduct = product.id;
          console.log(`Buscando producto con ID: ${idProduct}`);

          const productEntity = await this.productRepository.findOne({
            where: { id: idProduct },
          });

          if (!productEntity) {
            console.error('Producto no encontrado:', idProduct);
            throw new NotFoundException('Producto no encontrado');
          }
          if (productEntity.stock <= 0) {
            console.error('No hay más productos:', idProduct);
            throw new HttpException(
              `No hay más productos: ${productEntity.name}`,
              HttpStatus.BAD_REQUEST,
            );
          }

          productEntity.stock -= 1; // Decrementar el stock en lugar de establecerlo en -1
          await this.productRepository.save(productEntity);
          console.log('Producto actualizado:', productEntity);

          detalle.product.push(productEntity);

          total += parseFloat(productEntity.price.toString());
          console.log(
            `Producto: ${idProduct}, Precio: ${productEntity.price}, Total acumulado: ${total}`,
          );
        }),
      );
      detalle.price = total;
    } else {
      console.error('La lista de productos está vacía.');
      throw new NotFoundException('La lista de productos está vacía.');
    }

    await this.orderDetailsRepository.save(detalle);
    console.log('Detalle de la orden guardado:', detalle);

    return {
      orderId: orders.id,
      total: total,
      orderDetailId: detalle.id,
    };
  }

  async getOrder(idOrder:string) {
    console.log(idOrder);
    
    const order = await this.orderRepository.findOne({
      where: { id: idOrder },
      relations: {
        orderdetails: {
          product: true,
        },
      },
    });
console.log(order);

    if (!order) {
      throw new Error('No encontrado.');
    }

    return order;
  }
}
