import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '~/libs';

export const isFutureDate = (unixTimestamp: number): boolean => {
  const dateFromTimestamp = new Date(unixTimestamp * 1000);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return dateFromTimestamp > currentDate;
};

@ValidatorConstraint({ async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(unixTimestamp: number): boolean {
    return !isFutureDate(unixTimestamp);
  }

  defaultMessage(): string {
    return 'A data selecionada não pode estar no futuro.';
  }
}

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotFutureDateConstraint,
    });
  };
}
