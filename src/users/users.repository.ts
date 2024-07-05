import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserFack } from "./fackUsers.interface";
import { User } from './user.entity';
import { CreateUserDto } from "./users.dto";

export const users: UserFack[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    password: 'password123',
    address: '123 Main St',
    phone: '555-1234',
    country: 'USA',
    city: 'New York',
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    password: 'password456',
    address: '456 Elm St',
    phone: '555-5678',
    country: 'Canada',
    city: 'Toronto',
  },
  {
    id: '3',
    email: 'alice.jones@example.com',
    name: 'Alice Jones',
    password: 'password789',
    address: '789 Oak St',
    phone: '555-9876',
    country: 'UK',
    city: 'London',
  },
  {
    id: '4',
    email: 'bob.brown@example.com',
    name: 'Bob Brown',
    password: 'password321',
    address: '321 Pine St',
    phone: '555-6543',
  },
  {
    id: '5',
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
    password: 'securepassword456',
    address: '789 Maple Ave',
    phone: '555-7890',
  },
];

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  //conseguir todos los usuarios--
  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { page, limit, users };
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    if (!user) {
      return 'El usuario no existe. ';
    }
    //const {isAdmin, ...userSinIsAdmin} = user
    return user;
  }

  async createUser(user: CreateUserDto): Promise<Partial<User>> {
    const savedUser = await this.usersRepository.save(user);
    console.log(
      //plainObjectToEntityTransformer
      'Prueba de lo que devuelve el repositorio de user: ',
      Object.assign(this, user),
    );
    return savedUser;
  }

  async updateUser(id: string, updatedUser: any) {
    const user = await this.usersRepository.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      return `No se encontro al usuario con el id enviado.`;
    }
    const compare = { ...user, ...updatedUser };
    const updated = await this.usersRepository.save(compare);
    return updated;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return 'Usuario no encontrado';
    }
    const remove = await this.usersRepository.remove(user);
    return remove;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}

/*
// async getUsers(page: number, limit: number) {
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;
//     console.log(users);

//     return await users.slice(startIndex, endIndex);
//   }

  // async getUserById(id: string): Promise<UserFack> {
  //   const userId = await users.find((user) => user.id === id);
  //   return userId;
  // }

  // async createUser(user: UserFack) {
  //   const id = await (users.length + 1).toString();
  //   const newUser = { id, ...user };
  //   users.push(newUser);
  //   return newUser;
  // }

  // async updateUser(id: string, updatedUser: any) {
  //   const userId = await users.findIndex((user) => user.id === id);
  //   console.log(userId);

  //   if (userId === -1) {
  //     return `No se encontro al usuario con el id enviado.`;
  //   }
  //   const compare = { ...users[userId], ...updatedUser };

  //   return (users[userId] = compare);
  // }

  // async deleteUser(id: string) {
  //   const userId = await users.filter((user) => user.id !== id);
  //   return 'Usuario eliminado correctamente: ' + id;
  // }
  // async getUserByEmail(email: string) {
  //   const userId = await users.find((user) => user.email === email);
  //   return userId;
  // }
 */
// Modificar los el contenido del repositorio para que utilice la entidad Users para la gestión de información. En el caso de la búsqueda por Id la respuesta debe devolver al usuario incluyendo un array con las órdenes de compras efectuadas  (únicamente id y date).