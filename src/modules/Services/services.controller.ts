import { IsPublic } from '~/decorators';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '~/libs';
import { CustomErrorDto, ROUTES } from '~/utils';
import { ServicesDto } from './dto';
import { Services } from './entities';
import { ServiceTypes } from './enums';
import { FindServices, RegisterService } from './services';

@ApiTags(ROUTES.SERVICES)
@Controller(ROUTES.SERVICES)
export class ServicesController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly findServices: FindServices,
  ) {}

  @ApiOperation({ summary: 'Cadastra um novo serviço' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Services,
  })
  @IsPublic() //@TODO- REMOVER ROTA PUBLICA ASSIM QUE INTEGRAR NO APP
  @Post()
  async register(
    @Body(new ValidationPipe()) registerServiceDto: ServicesDto,
  ): Promise<Services> {
    return await this.registerService.register(registerServiceDto);
  }

  @ApiOperation({ summary: 'Retorna a lista de serviços disponíveis' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Services,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível listar os serviços',
    type: CustomErrorDto,
  })
  @Get()
  async find(): Promise<Services[]> {
    return await this.findServices.findActiveServices();
  }

  @ApiOperation({ summary: 'Retorna a lista de tipos de serviços disponíveis' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Não foi possível listar os tipos dos serviços',
    type: CustomErrorDto,
  })
  @IsPublic()
  @Get(ROUTES.SERVICES_TYPE)
  async findTypes(): Promise<ServiceTypes[]> {
    return Object.values(ServiceTypes);
  }
}
