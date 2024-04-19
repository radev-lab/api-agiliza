import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from '~/libs';
import { ServiceTypes } from '../enums';

export class ServicesDto {
  @ApiProperty({ example: 'Encanador', description: 'Nome do serviço' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Reparo de encanamento geral',
    description: 'Descrição do serviço',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 100.5, description: 'Preço do serviço' })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'hr',
    description: 'Tipo do preço, podendo ser "diaria", "hr", etc.',
  })
  @IsNotEmpty()
  @IsString()
  priceType: string;

  @ApiProperty({
    example: ServiceTypes.CONSTRUCTION,
    description: 'Tipo de serviço',
  })
  @IsString()
  readonly serviceType: string;

  @ApiProperty({
    example: 'c5527c82-0423-426a-9a59-cceb230069d7',
    description: 'Id do Agilize do serviço',
  })
  @IsString()
  readonly agilizeId: string;

  @ApiProperty({
    example: 'http://example.com/image.png',
    description: 'Link para uma imagem representativa do serviço',
  })
  @IsUrl()
  readonly imageURL: string;
}
