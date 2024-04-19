import { ExpressRequest } from '~/libs';
import { Agilize } from '~/modules';

export interface AuthRequest extends ExpressRequest {
  user: Agilize;
}
