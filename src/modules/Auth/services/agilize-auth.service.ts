import { Inject, Injectable, JwtService, bcrypt, forwardRef } from '~/libs';
import { Agilize, AgilizeFindService } from '~/modules';
import { AuthToken } from '../dto';
import { AuthJWTPayload } from '../types';

@Injectable()
export class AgilizeAuthService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => AgilizeFindService))
    private readonly agilizeFindService: AgilizeFindService,
  ) {}
  async login(agilize: Agilize): Promise<AuthToken> {
    const payload: AuthJWTPayload = {
      sub: agilize.id,
      phoneNumber: agilize.phoneNumber,
      name: agilize.name,
    };

    const accessToken = this.jwtService.sign(payload);

    const agilizeAccounts: Agilize =
      await this.agilizeFindService.findByPhoneNumber(agilize.phoneNumber);

    if (!agilizeAccounts) return;

    return {
      accessToken,
      user: {
        ...agilizeAccounts,
        password: undefined,
      },
      type: 'agilize',
    };
  }

  async validateAgilize(
    phoneNumber: string,
    password: string,
  ): Promise<Agilize> {
    const agilize = await this.agilizeFindService.findByPhoneNumber(
      phoneNumber,
    );

    if (!agilize) return;

    if (agilize) {
      const isPasswordValid = await bcrypt.compare(password, agilize.password);

      if (isPasswordValid) {
        return {
          ...agilize,
          password: undefined,
        };
      }
    }
    throw new Error('Telefone ou senha estão incorretos.');
  }
}
