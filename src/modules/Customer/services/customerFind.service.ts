import {
  BadRequestException,
  InjectRepository,
  Injectable,
  Repository,
} from '~/libs';
import { Customer } from '../entities';

@Injectable()
export class CustomerFindService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findByPhoneNumber(phoneNumber: string): Promise<Customer> {
    const existingCustomer = await this.customerRepository
      .createQueryBuilder('Customer')
      .where('Customer.phoneNumber = :phoneNumber', {
        phoneNumber: phoneNumber,
      })
      .getOne();

    return existingCustomer;
  }

  async findById(id: string): Promise<Customer> {
    if (!id) {
      throw new BadRequestException('ID do usuário não fornecido');
    }

    const Customer = await this.customerRepository.findOne({
      where: { id },
    });

    return Customer;
  }
}
