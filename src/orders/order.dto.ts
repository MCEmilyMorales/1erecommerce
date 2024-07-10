import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class CreateOrderDto {
  @ApiProperty({ description: 'Agregar el UUID del usuario', example: 'UUID' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos',
    example: [{ id: 'UUID producto 1' }, { id: 'UUID producto 2' }],
  })
  @IsArray()
  @ArrayNotEmpty({
    message:
      'La lista de productos no puede estar vacia, por favor comprueba de que contenga al menos un producto',
  })
  products: Partial<Product[]>;
}
