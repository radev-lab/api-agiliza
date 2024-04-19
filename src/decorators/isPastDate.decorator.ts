import {
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from '~/libs';

export const isPastDate = (unixTimestamp: number): boolean => {
  const dateFromTimestamp = new Date(unixTimestamp * 1000);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  return dateFromTimestamp < currentDate;
};

export class IsNotPastDateConstraint implements ValidatorConstraintInterface {
  validate(unixTimestamp: number): boolean {
    return !isPastDate(unixTimestamp);
  }

  defaultMessage(): string {
    return 'A data selecionada não pode estar no passado.';
  }
}

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotPastDateConstraint,
    });
  };
}
