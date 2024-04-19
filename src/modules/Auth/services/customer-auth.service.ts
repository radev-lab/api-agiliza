import { Inject, Injectable, JwtService, bcrypt, forwardRef } from '~/libs';
import { Customer, CustomerFindService } from '~/modules';
import { AuthToken } from '../dto';
import { AuthJWTPayload } from '../types';

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(forwardRef(() => CustomerFindService))
    private readonly customerFindService: CustomerFindService,
  ) {}
  async login(customer: Customer): Promise<AuthToken> {
    const payload: AuthJWTPayload = {
      sub: customer.id,
      phoneNumber: customer.phoneNumber,
      name: customer.name,
    };

    const accessToken = this.jwtService.sign(payload);

    const customerAccounts: Customer = await this.customerFindService.findById(
      customer.id,
    );

    if (!customerAccounts) return;

    return {
      accessToken,
      user: { ...customerAccounts, password: undefined },
      type: 'customer',
    };
  }

  async validateCustomer(
    phoneNumber: string,
    password: string,
  ): Promise<Customer> {
    const customer = await this.customerFindService.findByPhoneNumber(
      phoneNumber,
    );

    if (customer) {
      const isPasswordValid = await bcrypt.compare(password, customer.password);

      if (isPasswordValid) {
        return {
          ...customer,
          password: undefined,
        };
      }
    }
    throw new Error('Telefone ou senha estão incorretos.');
  }
}
