import {
  ConflictException,
  Inject,
  InjectRepository,
  Injectable,
  Repository,
  bcrypt,
  forwardRef,
} from '~/libs';
import { EmailService } from '~/modules';
import { RegisterCustomerDto } from '../dto';
import { Customer } from '../entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
  ) {}

  async register(registerCustomerDto: RegisterCustomerDto): Promise<Customer> {
    await this.validateInput(registerCustomerDto);

    const customer = await this.createCustomer(registerCustomerDto);

    await this.emailService.sendEmail(
      customer.email,
      'Confirmação de registro',
      'Seu registro foi bem sucedido.',
    );

    return this.generateUserProfile(customer);
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

  private async validateInput(dto: RegisterCustomerDto): Promise<void> {
    if (await this.isCustomerRegisteredByPhoneNumber(dto.phoneNumber)) {
      throw new ConflictException('Telefone já cadastrado.');
    }

    if (await this.isCustomerRegisteredByEmail(dto.email)) {
      throw new ConflictException('E-mail já cadastrado.');
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

  private generateUserProfile(customer: Customer): Customer {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    };
  }
}
