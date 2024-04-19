import {
  Inject,
  InjectRepository,
  Injectable,
  NotFoundException,
  Repository,
  forwardRef,
} from '~/libs';
import { CreateRatingDto } from '../dto/rating.dto';
import { Rating } from '../entities';
import { FindServices } from 'src/modules/Services';

@Injectable()
export class RegisterRating {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,

    @Inject(forwardRef(() => FindServices))
    private readonly findServices: FindServices,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = await this.createRating(createRatingDto);

    return rating;
  }

  private async createRating(dto: CreateRatingDto): Promise<Rating> {
    const rating = new Rating();

    const service = await this.findServices.findById(dto.serviceId);
    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    rating.score = dto.score;
    rating.feedback = dto.feedback;
    rating.service = service;

    return await this.ratingRepository.save(rating);
  }
}
