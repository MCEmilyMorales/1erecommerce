import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './category.entity';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,//base de datos pgadmin
  ) {}
  async addCategories() {
    data?.map(
      async (prop) => {
        await this.categoryRepository
          .createQueryBuilder()//creo un generador de consultas
          .insert()//ahora necesito insertar informacion
          .into(Category)//en este caso inserto en la tabla de category
          .values({ name: prop.category })//el valor que mapeo de la propiedad category del data.json
          .orIgnore()//y si hay algun duplicado,  en lugar de darme un error de duplicidad ignoralo silenciosamente y continua con lo que sigue
          .execute()//por ultimo ejecuta todas las consultas que te pase
  })
    return '1er paso listo, agregaste las categorias!'
  }
  async getCategories() {
    return this.categoryRepository.find()
  }
}
