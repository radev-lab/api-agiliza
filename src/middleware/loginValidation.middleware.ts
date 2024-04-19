import {
  BadRequestException,
  ExpressRequest,
  ExpressResponse,
  Injectable,
  NestMiddleware,
  NextFunction,
  validate,
} from '~/libs';
import { LoginDto } from '~/modules';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(
    req: ExpressRequest,
    _res: ExpressResponse,
    next: NextFunction,
  ): Promise<void> {
    const body = req.body;

    const loginRequestBody = new LoginDto();
    loginRequestBody.phoneNumber = body.phoneNumber;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
