import {
  ConflictException,
  Inject,
  InjectRepository,
  Injectable,
  Repository,
  bcrypt,
  forwardRef,
} from '~/libs';
import { EmailService } from '~/modules';
import { RegisterAgilizeDto } from '../dto';
import { Agilize, AgilizeAddress } from '../entities';

@Injectable()
export class RegisterAgilizeService {
  constructor(
    @InjectRepository(Agilize)
    private agilizeRepository: Repository<Agilize>,

    @InjectRepository(AgilizeAddress)
    private agilizeAddressRepository: Repository<AgilizeAddress>,

    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
  ) {}

  async register(registerAgilizeDto: RegisterAgilizeDto): Promise<Agilize> {
    await this.validateInput(registerAgilizeDto);

    const agilizeAddress = await this.createAgilizeAddress(registerAgilizeDto);
    const agilize = await this.createAgilize(
      registerAgilizeDto,
      agilizeAddress,
    );

    await this.emailService.sendEmail(
      agilize.email,
      'Confirmação de registro',
      'Seu registro foi bem sucedido.',
    );

    const agilizeRegister = this.generateAgilizeProfile(agilize);
    this.generateAgilizeAddressProfile(agilizeAddress);

    return agilizeRegister;
  }

  private async createAgilize(
    dto: RegisterAgilizeDto,
    agilizeAddress: AgilizeAddress,
  ): Promise<Agilize> {
    const agilize = new Agilize();

    agilize.document = dto.document;
    agilize.name = dto.name;
    agilize.email = dto.email;
    agilize.phoneNumber = dto.phoneNumber;
    agilize.professionalNumber = dto.professionalNumber;
    agilize.birthDate = dto.birthDate;
    agilize.experience = dto.experience;
    agilize.bio = dto.bio;
    agilize.password = await this.hashPassword(dto.password);
    agilize.availabilitySchedule = dto.availabilitySchedule;
    agilize.agilizeAddress = agilizeAddress;

    return this.agilizeRepository.save(agilize);
  }

  private async createAgilizeAddress(
    dto: RegisterAgilizeDto,
  ): Promise<AgilizeAddress> {
    const agilizeAddress = new AgilizeAddress();

    agilizeAddress.zipCode = dto.zipCode;
    agilizeAddress.street = dto.street;
    agilizeAddress.neighborhood = dto.neighborhood;
    agilizeAddress.city = dto.city;
    agilizeAddress.number = dto.number;
    agilizeAddress.state = dto.state;
    agilizeAddress.country = dto.country;

    return this.agilizeAddressRepository.save(agilizeAddress);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private async validateInput(dto: RegisterAgilizeDto): Promise<void> {
    if (await this.isAgilizeRegisteredByPhoneNumber(dto.phoneNumber)) {
      throw new ConflictException('Telefone já cadastrado');
    }

    if (await this.isAgilizeRegisteredByEmail(dto.email)) {
      throw new ConflictException('E-mail já cadastrado');
    }
  }

  private async isAgilizeRegisteredByPhoneNumber(
    phoneNumber: string,
  ): Promise<boolean> {
    const agilize = await this.agilizeRepository
      .createQueryBuilder('agilize')
      .where('agilize.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();

    return !!agilize;
  }

  private async isAgilizeRegisteredByEmail(email: string): Promise<boolean> {
    const agilize = await this.agilizeRepository
      .createQueryBuilder('agilize')
      .where('agilize.email = :email', { email })
      .getOne();

    return !!agilize && agilize.email !== '';
  }

  private generateAgilizeProfile(agilize: Agilize): Agilize {
    return {
      id: agilize.id,
      document: agilize.document,
      name: agilize.name,
      email: agilize.email,
      phoneNumber: agilize.phoneNumber,
      professionalNumber: agilize.professionalNumber,
      password: agilize.password,
      experience: agilize.experience,
      bio: agilize.bio,
      availabilitySchedule: agilize.availabilitySchedule,
      agilizeAddress: agilize.agilizeAddress,
      birthDate: agilize.birthDate,
    };
  }

  private generateAgilizeAddressProfile(
    agilizeAddress: AgilizeAddress,
  ): AgilizeAddress {
    return {
      id: agilizeAddress.id,
      zipCode: agilizeAddress.zipCode,
      street: agilizeAddress.street,
      neighborhood: agilizeAddress.neighborhood,
      number: agilizeAddress.number,
      city: agilizeAddress.city,
      state: agilizeAddress.state,
      country: agilizeAddress.country,
      agilize: agilizeAddress.agilize,
    };
  }
}
