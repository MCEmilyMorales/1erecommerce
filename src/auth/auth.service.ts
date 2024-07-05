import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

import { User } from "src/users/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { CreateUserDto } from "src/users/users.dto";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/roles.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'Conseguir traer autenticaciones';
  }

  async signin(email: string, password: string) {
    if (!email || !password) {
      return 'Por favor, envia todos los datos';
    }

    const userId = await this.usersRepository.getUserByEmail(email);
    if (!userId) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    //*aqui comparo lo que recibo por body con lo que ya tengo  guardado en la base de datos
    const isPasswordValid = await bcrypt.compare(password, userId.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    //* Firma de token, creo el payload, y genero el token y se lo envio al usuario
    const userPayload = {
      name: userId.name,
      email: userId.email,
      roles: [userId.isAdmin ? Role.Admin : Role.User], // buscar el rol de la base de datos
    };
    const token = this.jwtService.sign(userPayload);
    console.log('token nuevo: ', token);
    return { message: 'Usuario logueado correctamente', token };
  }

  async signUp(user: CreateUserDto): Promise<Partial<User>> {
    //tomo el email y password que recibo de parte de toda la informacion que recibo del cliente
    //desestructuro el email y password
    const { email, password } = user;
    const foundEmail = await this.usersRepository.getUserByEmail(email);
    // verifico que el cliente con el email no exista en la base de datos, si existe que arroje un error
    if (foundEmail) {
      throw new BadRequestException('El email ya está registrado');
    }
    // hashear la contraseña con 10 salt
    const hashPassword = await bcrypt.hash(password, 10);
    // si existe un error en el hash arrojar un error, y que lo intente mas tarde
    if (!hashPassword) {
      throw new BadRequestException(
        'Disculpe, ocurrio un error al hashear la contraseña, intente mas tarde.',
      );
    }
    const newUser = await this.usersRepository.createUser({
      ...user,
      password: hashPassword,
    });
    console.log('Prueba de lo que devuelve authservice: ', newUser);
    return newUser;
    // antes de transformar la contraseña y guardarla debo sumar el resto de informacion que me compartio el cliente por body-
  }
}