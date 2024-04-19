import { IsPublic } from '~/decorators';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '~/libs';
import { CustomErrorDto, ROUTES } from '~/utils';

import { AuthRequest, AuthToken, LoginDto } from './dto';
import { LocalAuthGuard } from './guard';
import { AgilizeAuthService, CustomerAuthService } from './services';

@ApiTags(ROUTES.AUTH)
@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly customerAuthService: CustomerAuthService,
    private readonly agilizeAuthService: AgilizeAuthService,
  ) {}

  @ApiOperation({ summary: 'Realiza login do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
    type: AuthToken,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Não autorizado',
    type: CustomErrorDto,
  })
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post(ROUTES.LOGIN)
  async login(
    @Body(new ValidationPipe()) loginRequestBody: LoginDto,
    @Request() req: AuthRequest,
  ): Promise<AuthToken> {
    const agilize = await this.agilizeAuthService.login(req.user);

    if (agilize) return agilize;

    const customer = await this.customerAuthService.login(req.user);

    if (customer) return customer;

    throw new Error('Telefone ou senha estão incorretos.');
  }
}
