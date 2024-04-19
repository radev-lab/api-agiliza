import { Module, NestTypeOrmModule } from '~/libs';
import { ServicesModule } from '../Services';
import { Rating } from './entities';
import { RatingController } from './rating.controller';
import { RegisterRating } from './services';

@Module({
  imports: [ServicesModule, NestTypeOrmModule.forFeature([Rating])],
  providers: [RegisterRating],
  controllers: [RatingController],
  exports: [],
})
export class RatingModule {}
