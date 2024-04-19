import {
  ApiProperty,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from '~/libs';
import { Services } from '~/modules';

@Entity()
export class Rating {
  @ApiProperty({
    example: '7a91ce0f-645c-4abe-86b7-945df9b2a31e',
    description: 'Id da avaliação',
  })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({
    example: 5,
    description: 'Nota da avaliação',
  })
  @Column({ type: 'int' })
  score: number;

  @ApiProperty({
    example: 'Excelente trabalho',
    description: 'Comentário',
  })
  @Column({ type: 'text', nullable: true })
  feedback: string;

  @ApiProperty({
    type: () => Services,
    description: 'Serviço relacionada a avaliação',
  })
  @ManyToOne(() => Services, (service) => service.ratings)
  @JoinColumn({ name: 'serviceId' })
  service: Services;
}
