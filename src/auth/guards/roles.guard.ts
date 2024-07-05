import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      //* Obtener el "Rol" de la Ruta desde metadata:
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(), // desde el contexto que me invoco
        context.getClass(), // desde la clase que me invoco
      ]);
      //* Obtengo rol del usuario:
      const request = context.switchToHttp().getRequest();
      console.log('este es el log de request"lo que requiere el cliente" de rolesguard : ', request);

      // viene del payloat===>
      const user = request.user;
      console.log('este es el log de user de rolesguard: ', user);
      
      //* Validar el Rol:
      const hasRole = () =>
        requiredRoles.some((role) => user?.roles?.includes(role));
      const valid = user && user.roles && hasRole();
      if (!valid) {
        throw new ForbiddenException(
          'No tiene permisos para acceder a esta ruta',
        );
      }
      return valid;
    }

}
//? traduccion
//? getAllAndOverride= conseguir todo y anular
//? getHandler= ObtenerControlador GET
//? getClass= Obtener clase
//! metada es la informacion que contiene el metodo donde lo aplico