import { Injectable } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async addOrder(userId: string, products) {
    return await this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(idOrder: string) {
    return await this.ordersRepository.getOrder(idOrder);
  }
}
