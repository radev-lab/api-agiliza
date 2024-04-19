import { ApiProperty } from '~/libs';

export class CustomErrorDto {
  @ApiProperty({ description: 'Mensagem com detalhes do erro' })
  message: string;

  @ApiProperty({ description: 'Mensagem do status do erro' })
  error: string;

  @ApiProperty({ description: 'Código de status do erro' })
  statusCode: number;
}
