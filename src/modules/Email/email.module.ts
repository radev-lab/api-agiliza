import { Module, forwardRef } from '~/libs';
import { EnvironmentModule } from '~/modules';

import { EmailService } from './services';

@Module({
  imports: [forwardRef(() => EnvironmentModule)],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
