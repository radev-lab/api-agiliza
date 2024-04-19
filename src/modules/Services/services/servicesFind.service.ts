import {
  BadRequestException,
  InjectRepository,
  Injectable,
  Repository,
} from '~/libs';
import { Services } from '../entities';
import { StatusServices } from '../enums';

@Injectable()
export class FindServices {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  async findActiveServices(): Promise<Services[]> {
    const services = await this.servicesRepository
      .createQueryBuilder('service')
      .innerJoinAndSelect('service.agilize', 'agilize')
      .innerJoinAndSelect('service.ratings', 'ratings')
      .where('service.status = :status', { status: StatusServices.ACTIVE })
      .getMany();

    return services.map((service) => {
      const agilize = { ...service.agilize, password: undefined };
      const ratings = service.ratings;
      const totalRatings = ratings.length;
      let averageScore = 0;
      if (totalRatings > 0) {
        const sum = ratings.reduce((total, rating) => total + rating.score, 0);
        averageScore = sum / totalRatings;
      }

      return {
        ...service,
        agilize,
        totalRatings,
        averageScore,
      };
    });
  }

  async findById(id: string): Promise<Services> {
    if (!id) {
      throw new BadRequestException('ID do serviço não fornecido');
    }

    const service = await this.servicesRepository.findOne({
      where: { id },
    });

    return service;
  }
}
