import { APP_GUARD, Module } from './libs';
import {
  AgilizeModule,
  AuthModule,
  CustomerModule,
  EmailModule,
  EnvironmentModule,
  JwtAuthGuard,
  RatingModule,
  ServicesModule,
  TypeOrmModule,
} from './modules';

@Module({
  imports: [
    EnvironmentModule,
    EmailModule,
    TypeOrmModule,
    AuthModule,
    CustomerModule,
    AgilizeModule,
    ServicesModule,
    RatingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
