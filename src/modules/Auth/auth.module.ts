import {
  JwtModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  PassportModule,
} from '~/libs';
import { LoginValidationMiddleware } from '~/middleware';
import { ROUTES } from '~/utils';
import { AgilizeModule } from '../Agilize';
import { CustomerModule } from '../Customer';
import { EnvironmentModule, EnvironmentService } from '../Environment';
import { AuthController } from './auth.controller';
import { AgilizeAuthService, CustomerAuthService } from './services';
import { JwtStrategy, LocalStrategy } from './strategy';

@Module({
  imports: [
    CustomerModule,
    AgilizeModule,
    PassportModule,
    EnvironmentModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      useFactory: (environmentService: EnvironmentService) => ({
        secret: environmentService.getJWTSecret(),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [EnvironmentService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    CustomerAuthService,
    AgilizeAuthService,
  ],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoginValidationMiddleware).forRoutes(ROUTES.LOGIN);
  }
}
