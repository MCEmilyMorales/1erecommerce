import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar', length: 50, nullable: false, unique: true})
  name: string;

  @OneToMany(category => Product, product => product.category)
  product: Product[];//1:N
}