import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryRepository } from './file-upload.repository';
import { Product } from 'src/products/product.entity';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryRepository: CloudinaryRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    //* me comunico con cloudinary
    const upload = await this.cloudinaryRepository.uploadImage(file);
    //* me comunico con la base de datos del producto, por medio del id que me pasa mi cliente para poder actualizar las imagenes que ya poseo
    const findImgProduct = await this.productsRepository.findOneBy({ id: id });
    //* le digo a la base de datos que si No encuentra el producto con el id que me comparte el cliente, entonces retorne un error
    if (!findImgProduct) {
      throw new NotFoundException(
        'No se encontro el producto con el id enviado',
      );
    }
    console.log('que me dice? ', upload.secure_url);

    //* piso el dato de la img que ya tengo cargada con la nueva imagen que me comparte el cliente
    findImgProduct.imgUrl = upload.secure_url;
    //* guardo la informacion nueva en la base de datos subiendo los cambios
    const saveFindProduct = this.productsRepository.save(findImgProduct);
    //* retorno solo la nueva secure_url que me entrega cloudinary
    return saveFindProduct;
  }
}
