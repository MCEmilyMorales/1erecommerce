import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:'decimal', precision:10, scale:2, nullable: false })
  price: number;

  @OneToOne((orderdetails) => Order, order => order.orderdetails)
  orders: Order; //relacion de 1:1 orders

  @ManyToMany((orderdetails) => Product, (product) => product.orderdetails)
  product: Product[]; //relacion de N:N product
}
