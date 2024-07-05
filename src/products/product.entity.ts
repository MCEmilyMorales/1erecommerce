import { Category } from '../categories/category.entity';
import { OrderDetails } from '../orderDetails/orderDetails.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false }) //*precision : hasta 10 cifras- scale: 2 decimales
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    default:
      'https://th.bing.com/th/id/OIP.U3P4xbmDm1sz9PtLhfWx9wHaHa?w=189&h=189&c=7&r=0&o=5&pid=1.7',
  })
  imgUrl: string;

  @ManyToOne((product) => Category, (category) => category.product)
  category: Category; //relacion de un producto con una categoria, y ademas va a ir a buscar en la db, el uuid que corresponde en base a la categoria
// va a ser un solo registro de categorias
  @ManyToMany((product) => OrderDetails, (orderDetails) => orderDetails.product)
  @JoinTable()
  orderdetails: OrderDetails[]; // relacion de N:N
}
