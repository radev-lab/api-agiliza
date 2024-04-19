import {
  ApiProperty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from '~/libs';

export class RegisterAgilizeDto {
  @ApiProperty({
    description: 'Documento (CPF ou CNPJ) do prestador de serviços',
    example: '12345678901',
  })
  @Length(11, 14, {
    message: 'O documento deve conter entre 11 e 14 números.',
  })
  document: string;

  @ApiProperty({
    description: 'Nome completo do prestador de serviços',
    example: 'Matheus de Sousa',
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
    description: 'Endereço de email do prestador de serviços',
    example: 'raimonesrg3@gmail.com',
  })
  @IsOptional()
  @Matches(/^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: 'Por favor, forneça um endereço de email válido.',
  })
  email: string;

  @ApiProperty({
    description: 'Número de telefone do prestador de serviços',
    example: '63992623201',
  })
  @IsNotEmpty({ message: 'Por favor, forneça um número de telefone.' })
  @IsString({ message: 'O número de telefone deve ser uma string.' })
  @Length(10, 11, {
    message: 'O número de telefone deve ter 10 ou 11 números.',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Código de registro prestador de serviços',
    example: 'TO-15648/D',
  })
  @IsOptional()
  @IsString({ message: 'O número de registro deve ser uma string.' })
  professionalNumber: string;

  @ApiProperty({
    description: 'Data de nascimento do prestador de serviços',
    example: '23/06/1995',
  })
  @IsString({ message: 'Data de nascimento deve ser uma string.' })
  birthDate: string;

  @ApiProperty({
    description: 'Profissão ou área de atuação do prestador de serviços',
    example: 'Back-end developer',
  })
  @IsString({ message: 'A profissão ou área de atuação deve ser uma string.' })
  experience: string;

  @ApiProperty({
    description: 'Resumo/Biografia do prestador de serviços',
    example: 'Atuo na área desde 2005 e graduado desde 2010',
  })
  @IsOptional()
  @Length(0, 255, {
    message: 'Conte-nos sobre você deve conter entre 0 e 255 caracteres.',
  })
  bio: string;

  @ApiProperty({
    description: 'Disponibilidade do prestador de serviços',
    example: 'Segunda a Sexta, das 8h às 18h',
  })
  availabilitySchedule: string;

  @ApiProperty({
    description: 'CEP do prestador de serviços',
    example: '77827000',
  })
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres.' })
  zipCode: string;

  @ApiProperty({
    description: 'Nome da rua',
    example: 'Rua Principal',
  })
  street: string;

  @ApiProperty({
    description: 'Nome do bairro',
    example: 'Centro',
  })
  neighborhood: string;

  @ApiProperty({
    description: 'Nome da cidade',
    example: 'Araguaína',
  })
  city: string;

  @ApiProperty({
    description: 'Número da casa',
    example: '123',
  })
  number: string;

  @ApiProperty({
    description: 'Nome do Estado',
    example: 'Tocantins',
  })
  state: string;

  @ApiProperty({
    description: 'Nome do País',
    example: 'Brasil',
  })
  country: string;

  @ApiProperty({
    description: 'Senha de login do prestador de serviços',
    example: 'Password@123',
  })
  @IsNotEmpty({ message: 'Por favor, forneça uma senha.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @Length(6, 16, {
    message: 'A senha deve ter entre 6 e 16 caracteres.',
  })
  password: string;
}
