import { ExtractJwt, Injectable, PassportStrategy, Strategy } from '~/libs';
import { AuthFromJwt, AuthJWTPayload } from '../types';
import { EnvironmentService } from 'src/modules/Environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private environmentService: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentService.getJWTSecret(),
    });
  }

  async validate(payload: AuthJWTPayload): Promise<AuthFromJwt> {
    return {
      id: payload.sub,
      phoneNumber: payload.phoneNumber,
      name: payload.name,
    };
  }
}
