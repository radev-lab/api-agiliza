import { InjectRepository, Injectable, Repository, bcrypt } from '~/libs';
import { RegisterCustomerDto } from '../dto';
import { Customer } from '../entities';

@Injectable()
export class CustomerToAgilizeService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async register(registerCustomerDto: RegisterCustomerDto): Promise<Customer> {
    const hasRegister = await this.validateInput(registerCustomerDto);

    if (hasRegister) return;

    const customer = await this.createCustomer(registerCustomerDto);

    return this.generateCustomerProfile(customer);
  }

  private async createCustomer(dto: RegisterCustomerDto): Promise<Customer> {
    const customer = new Customer();

    customer.name = dto.name;
    customer.email = dto.email;
    customer.phoneNumber = dto.phoneNumber;
    customer.password = await this.hashPassword(dto.password);

    return await this.customerRepository.save(customer);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async validateInput(dto: RegisterCustomerDto): Promise<boolean> {
    if (await this.isCustomerRegisteredByPhoneNumber(dto.phoneNumber)) {
      return true;
    }

    if (await this.isCustomerRegisteredByEmail(dto.email)) {
      return true;
    }
  }

  private async isCustomerRegisteredByPhoneNumber(
    phoneNumber: string,
  ): Promise<boolean> {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();

    return !!customer;
  }

  private async isCustomerRegisteredByEmail(email: string): Promise<boolean> {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.email = :email', { email })
      .getOne();

    return !!customer && customer.email !== '';
  }

  private generateCustomerProfile(customer: Customer): Customer {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    };
  }
}
