import { Exclude } from "class-transformer";
import { Order } from "../orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  password: string;

  @Column({ type: 'varchar' })
  phone: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country?: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city?: string;

  @OneToMany((user) => Order, (order) => order.user)
  orders?: Order[]; //relacion 1:N con Order

  @Exclude()
  @Column({ default: false })
  isAdmin: boolean;
}