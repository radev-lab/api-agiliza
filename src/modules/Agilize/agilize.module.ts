import { Module, NestTypeOrmModule, forwardRef } from '~/libs';
import { Customer, CustomerToAgilizeService } from '../Customer';
import { EmailModule } from '../Email';
import { AgilizeController } from './agilize.controller';
import { Agilize, AgilizeAddress } from './entities';
import { AgilizeFindService, RegisterAgilizeService } from './services';

@Module({
  imports: [
    NestTypeOrmModule.forFeature([Customer]),
    NestTypeOrmModule.forFeature([Agilize, AgilizeAddress]),
    forwardRef(() => EmailModule),
  ],
  providers: [
    RegisterAgilizeService,
    AgilizeFindService,
    CustomerToAgilizeService,
  ],
  controllers: [AgilizeController],
  exports: [
    AgilizeFindService,
    NestTypeOrmModule.forFeature([Agilize, AgilizeAddress]),
  ],
})
export class AgilizeModule {}
