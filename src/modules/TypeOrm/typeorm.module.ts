import { Module, NestTypeOrmModule } from '~/libs';
import {
  Agilize,
  AgilizeAddress,
  Customer,
  EnvironmentModule,
  EnvironmentService,
  Rating,
  Services,
} from '~/modules';
@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: async (environmentService: EnvironmentService) => ({
        type: 'postgres',
        host: environmentService.getHostDatabase(),
        port: Number(environmentService.getPortDatabase()),
        username: environmentService.getUsernameDatabase(),
        password: environmentService.getPasswordDatabase(),
        database: environmentService.getDatabaseName(),
        entities: [Customer, Agilize, AgilizeAddress, Services, Rating],
        synchronize: true,
        ssl: true,
      }),
    }),
  ],
  providers: [EnvironmentService],
  exports: [NestTypeOrmModule],
})
export class TypeOrmModule {}
