import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Debe enviar el token');
    }

    try {
      const verifySignature = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, {
        secret: verifySignature,
      });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      request.user = payload// esta asignacion para que es? es para que en la request viaje y se cargue si el user es tipo admin o user? 
      console.log('payload de auth guards: ', request.user);
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido')
    }    
  }
}
//!documentacion
//? el user hacer referencia al payload 'request.user = payload' esta conectado con el guradian de Roles-
//const request = context.switchToHttp().getRequest();
 //   return validateRequest(request);

 /* function validate (request: Request): boolean{
  const authHeader = request.headers?.authorization
  console.log(authHeader);
  
  const auth = authHeader.split(' ')[1]//*['Basic', 'email:password']
  if(!auth) return false;

  const [email, password]= auth.split(':')//*['email', 'password']
  if(!email || !password)return false;

  return true
} */