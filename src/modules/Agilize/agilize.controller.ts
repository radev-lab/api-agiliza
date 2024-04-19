import { IsPublic } from '~/decorators';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '~/libs';
import { CustomErrorDto, ROUTES, ROUTE_PARAMS } from '~/utils';
import { CustomerToAgilizeService } from '../Customer';
import { RegisterAgilizeDto } from './dto';
import { Agilize } from './entities';
import { AgilizeFindService, RegisterAgilizeService } from './services';

@ApiTags(ROUTES.AGILIZE)
@Controller(ROUTES.AGILIZE)
export class AgilizeController {
  constructor(
    private readonly agilizeService: RegisterAgilizeService,
    private readonly customerToAgilizeService: CustomerToAgilizeService,
    private readonly agilizeFindService: AgilizeFindService,
  ) {}

  @ApiOperation({ summary: 'Cadastra um novo prestador de serviços' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Agilize,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Telefone já cadastrado',
    type: CustomErrorDto,
  })
  @IsPublic()
  @Post()
  async register(
    @Body(new ValidationPipe()) registerAgilizeDto: RegisterAgilizeDto,
  ): Promise<Agilize> {
    await this.customerToAgilizeService.register(registerAgilizeDto);
    return await this.agilizeService.register(registerAgilizeDto);
  }

  @ApiOperation({ summary: 'Busca um agilize pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Agilize,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Agilize não encontrado',
    type: CustomErrorDto,
  })
  @Get(`:${ROUTE_PARAMS.ID}`)
  async findById(@Param(ROUTE_PARAMS.ID) id: string): Promise<Agilize> {
    return await this.agilizeFindService.findById(id);
  }
}
