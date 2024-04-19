import {
  ApiProperty,
  Column,
  CreateDateColumn,
  Entity,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '~/libs';
import { Agilize, Rating } from '~/modules';
import { ENTITY } from '~/utils';
import { ServiceTypes, StatusServices } from '../enums';

@Entity(ENTITY.SERVICES)
export class Services {
  @ApiProperty({
    example: '6a08d47b-a63b-4138-a38f-0df1de7ffef9	',
    description: 'id do serviço',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Encanador', description: 'Nome do serviço' })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Reparo de encanamento geral',
    description: 'Descrição do serviço',
  })
  description: string;

  @Column('decimal')
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100.5, description: 'Preço do serviço' })
  price: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'hr',
    description: 'Tipo do preço, podendo ser "diaria", "hr", etc.',
  })
  priceType: string;

  @Column()
  @IsString()
  @ApiProperty({
    example: ServiceTypes.CONSTRUCTION,
    description: 'Tipo de serviço',
  })
  serviceType: ServiceTypes;

  @Column()
  @IsUrl()
  @ApiProperty({
    example: 'http://example.com/image.png',
    description: 'Link para uma imagem representativa do serviço',
  })
  imageURL: string;

  @ApiProperty({
    example: '2024-02-25T00:07:12.657Z',
    description: 'Data de criação',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-25T00:07:12.657Z',
    description: 'Data de atualização',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: 'PENDING',
    description: 'Status de disponibilidade do serviço',
  })
  @Column({
    type: 'enum',
    enum: StatusServices,
    default: StatusServices.PENDING,
  })
  status: StatusServices;

  @ApiProperty({
    type: () => Agilize,
    description: 'Usuário fornecedor do serviço',
  })
  @ManyToOne(() => Agilize, (agilize) => agilize.services)
  @JoinColumn({ name: 'agilizeId' })
  agilize: Agilize;

  @ApiProperty({
    type: () => Rating,
    description: 'Avaliações associadas ao serviço',
  })
  @OneToMany(() => Rating, (rating) => rating.service)
  ratings?: Rating[];

  totalRatings?: number;
  averageScore?: number;
}
