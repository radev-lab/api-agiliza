import { Module, NestTypeOrmModule, forwardRef } from '~/libs';
import { EmailModule } from '../Email';
import { CustomerController } from './customer.controller';
import { Customer } from './entities';
import {
  CustomerFindService,
  CustomerService,
  CustomerToAgilizeService,
} from './services';

@Module({
  imports: [
    NestTypeOrmModule.forFeature([Customer]),
    forwardRef(() => EmailModule),
  ],
  providers: [CustomerService, CustomerToAgilizeService, CustomerFindService],
  controllers: [CustomerController],
  exports: [
    CustomerFindService,
    CustomerService,
    CustomerToAgilizeService,
    NestTypeOrmModule.forFeature([Customer]),
  ],
})
export class CustomerModule {}
