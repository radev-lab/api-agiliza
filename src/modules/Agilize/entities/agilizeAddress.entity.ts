import {
  ApiProperty,
  Column,
  Entity,
  IsOptional,
  OneToOne,
  PrimaryGeneratedColumn,
} from '~/libs';
import { ENTITY } from '~/utils';
import { Agilize } from './agilize.entity';

@Entity(ENTITY.AGILIZE_ADDRESS)
export class AgilizeAddress {
  @ApiProperty({
    description: 'ID da tabela de endereço',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome da rua' })
  @Column()
  street: string;

  @ApiProperty({ description: 'Nome do bairro' })
  @Column()
  neighborhood: string;

  @ApiProperty({ description: 'Nome da cidade' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Número da casa' })
  @Column()
  number: string;

  @ApiProperty({ description: 'CEP - código de endereçamento postal' })
  @Column()
  zipCode: string;

  @ApiProperty({ description: 'Nome do Estado' })
  @Column()
  state: string;

  @ApiProperty({ description: 'Nome do País' })
  @Column({ default: 'Brasil' })
  @IsOptional()
  country: string;

  @ApiProperty({
    description:
      'Chave estrangeira do relacionamento com prestador de serviços',
  })
  @OneToOne(() => Agilize, (agilize) => agilize.agilizeAddress, {
    cascade: true,
    lazy: true,
  })
  agilize: Promise<Agilize>;
}
