import {
  AuthGuard,
  ExecutionContext,
  Injectable,
  Observable,
  UnauthorizedException,
} from '~/libs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}
