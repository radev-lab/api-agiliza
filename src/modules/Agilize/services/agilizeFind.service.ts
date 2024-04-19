import {
  BadRequestException,
  InjectRepository,
  Injectable,
  Repository,
} from '~/libs';
import { Agilize } from '../entities';

@Injectable()
export class AgilizeFindService {
  constructor(
    @InjectRepository(Agilize)
    private agilizeRepository: Repository<Agilize>,
  ) {}

  async findByPhoneNumber(phoneNumber: string): Promise<Agilize> {
    const existingAgilize = await this.agilizeRepository
      .createQueryBuilder('Agilize')
      .leftJoinAndSelect('Agilize.agilizeAddress', 'AgilizeAddress')
      .where('Agilize.phoneNumber = :phoneNumber', {
        phoneNumber: phoneNumber,
      })
      .getOne();

    return existingAgilize;
  }

  async findById(id: string): Promise<Agilize> {
    if (!id) {
      throw new BadRequestException('ID do Agilize não fornecido');
    }

    const agilize = await this.agilizeRepository.findOne({
      where: { id },
      relations: ['agilizeAddress', 'services', 'services.ratings'],
    });

    const services = agilize.services.map((service) => {
      const ratings = service.ratings;
      const totalRatings = ratings.length;
      let averageScore = 0;
      if (totalRatings > 0) {
        const sum = ratings.reduce((total, rating) => total + rating.score, 0);
        averageScore = sum / totalRatings;
      }

      return {
        ...service,
        totalRatings,
        averageScore,
      };
    });

    return { ...agilize, services };
  }
}
