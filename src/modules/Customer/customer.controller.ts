import { IsPublic } from '~/decorators';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '~/libs';
import { CustomErrorDto, ROUTES } from '~/utils';
import { RegisterCustomerDto } from './dto';
import { Customer } from './entities';
import { CustomerService } from './services';

@ApiTags(ROUTES.CUSTOMER)
@Controller(ROUTES.CUSTOMER)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Cadastra um novo cliente' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Customer,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Telefone já cadastrado',
    type: CustomErrorDto,
  })
  @IsPublic()
  @Post()
  async register(
    @Body(new ValidationPipe()) registerCustomerDto: RegisterCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.register(registerCustomerDto);
  }
}
