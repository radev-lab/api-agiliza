import { ApiProperty } from '~/libs';

export class Pagination<T> {
  @ApiProperty({
    description: 'Lista de itens da pagina atual',
  })
  items: T[];

  @ApiProperty({
    description: 'Quantidade total de paginas',
  })
  totalPages: number;

  @ApiProperty({ description: 'Quantidade total de itens ' })
  totalItems: number;

  @ApiProperty({ description: 'Número da página atual' })
  currentPage: number;

  @ApiProperty({ description: 'Quantidade de itens exibidos na pagina' })
  pageSize: number;
}
