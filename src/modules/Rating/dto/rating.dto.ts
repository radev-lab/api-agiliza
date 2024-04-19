import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from '~/libs';

export class CreateRatingDto {
  @ApiProperty({
    example: '7a91ce0f-645c-4abe-86b7-945df9b2a31e',
    description: 'Id do serviço',
  })
  @IsNotEmpty()
  @IsString()
  readonly serviceId: string;

  @ApiProperty({ example: 5, description: 'Nota de avaliação do serviço' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly score: number;

  @ApiProperty({
    example: 'Serviço ótimo',
    description: 'feedback do serviço',
  })
  @IsNotEmpty()
  @IsString()
  readonly feedback: string;
}
