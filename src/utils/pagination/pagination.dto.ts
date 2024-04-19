import { ApiProperty } from '@nestjs/swagger';
import { ORDER_BY } from './orderBy.enum';

export class PaginatedDto {
  @ApiProperty({ description: 'O número da página desejada.' })
  page: number;

  @ApiProperty({ description: 'O tamanho da pagina desejada.' })
  pageSize: number;

  @ApiProperty({
    description: 'Por qual propriedade que será utilizada para ordenação',
  })
  sort: string;

  @ApiProperty({
    enum: ['asc', 'desc'],
    description:
      'Define se o resultado virá ordenado de forma crescente ou decrescente',
  })
  orderBy: ORDER_BY;
  search: string;
}
