import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orders' })
export class Order {
  @ApiProperty({ description: 'El id sera del tipo UUID, generado por la DB' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((order) => User, (user) => user.orders)
  user: User; //relacion de 1:n user

  @ApiProperty({
    description: 'La fecha debe ser generada del tipo DD/MM/YY',
    example: '01/01/2024',
  })
  @Column({ type: 'date' })
  date: Date;

  @OneToOne((order) => OrderDetails, (orderDetails) => orderDetails.orders)
  @JoinColumn()
  orderdetails: OrderDetails; //relacion de 1:1 orderdetails
}
