import {
  ApiProperty,
  Column,
  Entity,
  IsEmail,
  IsNotEmpty,
  PrimaryGeneratedColumn,
} from '~/libs';
import { ENTITY } from '~/utils';

@Entity(ENTITY.CUSTOMER)
export class Customer {
  @ApiProperty({ description: 'ID do cliente' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome do cliente' })
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'E-mail do cliente' })
  @Column({ nullable: true })
  @IsEmail()
  email: string | null;

  @ApiProperty({ description: 'Número de telefone do cliente' })
  @Column({ unique: true })
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsNotEmpty()
  password?: string;
}
