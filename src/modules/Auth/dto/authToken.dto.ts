import { ApiProperty } from '~/libs';
import { Agilize, Customer } from '~/modules';

export class AuthToken {
  @ApiProperty({ example: 'jwt token' })
  accessToken: string;

  @ApiProperty({ example: Agilize })
  user: Agilize | Customer;

  @ApiProperty({ example: 'Customer' })
  type: string;
}
