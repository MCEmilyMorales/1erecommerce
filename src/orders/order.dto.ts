import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested, isNotEmpty } from "class-validator";

class ProductDto {

  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  /**
   * Esta es la propiedad Id del user del tipo UUID
   * @example 308c9a4c-f2fb-4b40-95ff-a004ac6573ad
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Esta es la propiedad products, puede contener un array con el id de varios products
   * @example [id: 308c9a4c-f2fb-4b40-95ff-a004ac6573ad]
   */
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty({
    message:
      'La lista de productos no puede estar vacia, por favor comprueba de que contenga al menos un producto',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: string[];
}