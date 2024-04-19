import { Injectable, PassportStrategy, StrategyLocal } from '~/libs';

import { Agilize, Customer } from '~/modules';
import { AgilizeAuthService, CustomerAuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(StrategyLocal) {
  constructor(
    private agilizeAuthService: AgilizeAuthService,
    private customerAuthService: CustomerAuthService,
  ) {
    super({ usernameField: 'phoneNumber' });
  }

  async validate(
    phoneNumber: string,
    password: string,
  ): Promise<Customer | Agilize> {
    const agilize = await this.agilizeAuthService.validateAgilize(
      phoneNumber,
      password,
    );

    if (agilize) return agilize;

    return await this.customerAuthService.validateCustomer(
      phoneNumber,
      password,
    );
  }
}
