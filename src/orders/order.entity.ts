import { OrderDetails } from "../orderDetails/orderDetails.entity";
import { User } from "../users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((order) => User, user=> user.orders)
  user: User; //relacion de 1:n user

  @Column({type:'date'})
  date: Date;

  @OneToOne((order) => OrderDetails, orderDetails => orderDetails.orders)
  @JoinColumn()
  orderdetails: OrderDetails; //relacion de 1:1 orderdetails
}

