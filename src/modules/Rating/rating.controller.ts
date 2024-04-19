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
import { ROUTES } from '~/utils';
import { CreateRatingDto } from './dto';
import { Rating } from './entities';
import { RegisterRating } from './services';

@ApiTags(ROUTES.RATING)
@Controller(ROUTES.RATING)
export class RatingController {
  constructor(private readonly registerRating: RegisterRating) {}

  @ApiOperation({ summary: 'Registra a avaliação de um serviço.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Rating,
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) createRatingDto: CreateRatingDto,
  ): Promise<Rating> {
    return await this.registerRating.create(createRatingDto);
  }
}
