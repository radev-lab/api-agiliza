import { ApiProperty, IsNotEmpty, IsString } from '~/libs';

export class LoginDto {
  @ApiProperty({
    description: 'Telefone do usuário',
    example: '99999999999',
  })
  @IsNotEmpty({ message: 'Por favor, forneça um número de telefone.' })
  @IsString({ message: 'O telefone deve ser uma string.' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    example: 'Pass@123',
  })
  @IsString()
  password: string;
}
