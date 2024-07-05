import { SetMetadata } from "@nestjs/common";
import { Role } from "src/roles.enum";

export const Roles = (...roles: Role[])=>SetMetadata('roles', roles)//diccionario asociado a cada request que recibimos
// retornarmos la metada o seteamos la metada que contiene una propiedad roles y una propiedad roles-