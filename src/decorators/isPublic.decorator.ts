import { CustomDecorator, SetMetadata } from '~/libs';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_KEY, true);
