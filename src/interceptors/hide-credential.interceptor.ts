import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HideCredentialInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        if (Array.isArray(user)) {
          return user.map(({ password, isAdmin, ...rest }) => rest);
        } else {
          const { password, isAdmin, ...rest } = user;
          return rest;
        }
      }),
    );
  }
}
