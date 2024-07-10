import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @ApiProperty({ description: 'El id sera del tipo UUID, generado por la DB' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description:
      'El precio será del tipo number, con una precision de 10, scale 2',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne((orderdetails) => Order, (order) => order.orderdetails)
  orders: Order; //relacion de 1:1 orders

  @ManyToMany((orderdetails) => Product, (product) => product.orderdetails)
  product: Product[]; //relacion de N:N product
}
