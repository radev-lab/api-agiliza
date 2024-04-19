import { Module, NestTypeOrmModule, forwardRef } from '~/libs';
import { AgilizeModule } from '../Agilize';
import { EmailModule } from '../Email';
import { Services } from './entities';
import { FindServices, RegisterService } from './services';
import { ServicesController } from './services.controller';

@Module({
  imports: [
    AgilizeModule,
    NestTypeOrmModule.forFeature([Services]),
    forwardRef(() => EmailModule),
  ],
  providers: [RegisterService, FindServices],
  controllers: [ServicesController],
  exports: [
    FindServices,
    RegisterService,
    NestTypeOrmModule.forFeature([Services]),
  ],
})
export class ServicesModule {}
