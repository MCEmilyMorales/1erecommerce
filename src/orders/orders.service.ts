import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(userId, products) {
    return await this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(idOrder:string) {
    console.log(idOrder);
    
    return await this.ordersRepository.getOrder(idOrder);
  }
}
