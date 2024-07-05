import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    console.log('Este log es del user de userservice__',user);
    //! esta es otra forma de quitar el atributo de IsAdmin de lo que recibo del userRepositorio
    //  if (typeof user === 'object' && user !== null && 'isAdmin' in user) {
    //    const { isAdmin, ...userSinIsAdmin } = user;
    //    return userSinIsAdmin;
    //  } 
     return user;
  }

  async createUser(user) {
    return await this.usersRepository.createUser(user);
  }

  updateUser(id: string, updatedUser: any) {
    return this.usersRepository.updateUser(id, updatedUser);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
/*
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: string, updatedUser: any) {
    return this.usersRepository.updateUser(id, updatedUser);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
 */