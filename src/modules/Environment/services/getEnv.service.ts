import { ConfigService, Injectable } from '~/libs';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService) {}

  getEnv(): string {
    return this.configService.get<string>('ENV');
  }

  getHostDatabase(): string {
    return this.configService.get<string>('HOST_DATA_BASE');
  }

  getPortDatabase(): string {
    return this.configService.get<string>('PORT_DATA_BASE');
  }

  getUsernameDatabase(): string {
    return this.configService.get<string>('USERNAME_DATA_BASE');
  }

  getPasswordDatabase(): string {
    return this.configService.get<string>('PASSWORD_DATA_BASE');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('NAME_DATA_BASE');
  }

  getHostEmail(): string {
    return this.configService.get<string>('HOST_EMAIL');
  }

  getPortEmail(): string {
    return this.configService.get<string>('PORT_EMAIL');
  }

  getUserEmail(): string {
    return this.configService.get<string>('USER_EMAIL');
  }

  getPasswordEmail(): string {
    return this.configService.get<string>('PASSWORD_EMAIL');
  }

  getJWTSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
