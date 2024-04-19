import {
  ApiProperty,
  Column,
  Entity,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from '~/libs';
import { Services } from '~/modules';
import { ENTITY } from '~/utils';
import { AgilizeAddress } from './agilizeAddress.entity';

@Entity(ENTITY.AGILIZE)
export class Agilize {
  @ApiProperty({ description: 'ID do prestador de serviços' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'CPF/CNPJ do prestador de serviços' })
  @Column({ unique: true })
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: 'Nome do prestador de serviços' })
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'E-mail do prestador de serviços' })
  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Número de telefone do prestador de serviços' })
  @Column({ unique: true })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Código de registro profissional do prestador de serviços',
  })
  @Column({ nullable: true })
  professionalNumber: string;

  @ApiProperty({
    description: 'Data de nascimento do prestador de serviços',
  })
  @Column()
  birthDate: string;

  @ApiProperty({
    description: 'Profissão ou área de atuação do prestador de serviços',
  })
  @Column()
  @IsNotEmpty()
  experience: string;

  @ApiProperty({
    description: 'Horário de disponibilidade do prestador de serviços',
  })
  @Column()
  availabilitySchedule: string;

  @ApiProperty({
    description: 'Recado/Bio do prestador de serviços',
  })
  @Column({ nullable: true })
  @IsOptional()
  bio?: string;

  @ApiProperty({
    description: 'Senha de login do prestador de serviços',
  })
  @Column()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description:
      'Chave estrangeira do relacionamento com endereço do prestador de serviços',
  })
  @OneToOne(() => AgilizeAddress, (agilizeAddress) => agilizeAddress.agilize)
  @JoinColumn({ name: 'agilizeAddressId' })
  agilizeAddress: AgilizeAddress;

  @ApiProperty({
    type: () => Services,
    description: 'Serviços associados ao Agilize',
  })
  @OneToMany(() => Services, (services) => services.agilize)
  services?: Services[];
}
