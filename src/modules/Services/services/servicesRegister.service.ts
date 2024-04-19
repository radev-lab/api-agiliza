import {
  Inject,
  InjectRepository,
  Injectable,
  NotFoundException,
  Repository,
  forwardRef,
} from '~/libs';
import { AgilizeFindService } from '~/modules';
import { ServicesDto } from '../dto';
import { Services } from '../entities';
import { ServiceTypes } from '../enums';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,

    @Inject(forwardRef(() => AgilizeFindService))
    private readonly agilizeFindService: AgilizeFindService,
  ) {}

  async register(registerServicesDto: ServicesDto): Promise<Services> {
    const service = await this.createService(registerServicesDto);

    return this.generateService(service);
  }

  private async createService(dto: ServicesDto): Promise<Services> {
    const service = new Services();

    const agilize = await this.agilizeFindService.findById(dto.agilizeId);
    if (!agilize) {
      throw new NotFoundException('Agilize não encontrado');
    }

    service.name = dto.name;
    service.description = dto.description;
    service.imageURL = dto.imageURL;
    service.price = dto.price;
    service.serviceType = dto.serviceType as ServiceTypes;
    service.priceType = dto.priceType;
    service.agilize = agilize;

    return await this.servicesRepository.save(service);
  }

  private generateService(service: Services): Services {
    return { ...service, agilize: { ...service.agilize, password: undefined } };
  }
}
