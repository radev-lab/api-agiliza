import {
  ApiProperty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '~/libs';

export class RegisterCustomerDto {
  @ApiProperty({
    example: 'Matheus de Sousa',
    description: 'O nome completo do cliente',
  })
  @IsNotEmpty({ message: 'Por favor, forneça um nome.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Matches(/^[a-zA-ZÀ-ú\s]+$/, {
    message: 'O nome deve conter apenas letras e espaços.',
  })
  @Length(2, 100, {
    message: 'O nome deve ter entre 2 e 100 caracteres.',
  })
  name: string;

  @ApiProperty({
    example: 'raimonesrg3@gmail.com',
    description: 'O endereço de email do cliente',
  })
  @IsOptional()
  @Matches(/^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: 'Por favor, forneça um endereço de email válido.',
  })
  email: string;

  @ApiProperty({
    example: '(63) 9 9999-9999',
    description: 'O número de telefone do usuário',
  })
  @IsNotEmpty({ message: 'Por favor, forneça um número de telefone.' })
  @IsString({ message: 'O número de telefone deve ser uma string.' })
  @Length(10, 11, {
    message: 'O número de telefone deve ter 10 ou 11 números.',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Password@123', description: 'A senha do cliente' })
  @IsNotEmpty({ message: 'Por favor, forneça uma senha.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @Length(6, 16, {
    message: 'A senha deve ter entre 6 e 16 caracteres.',
  })
  password: string;
}
