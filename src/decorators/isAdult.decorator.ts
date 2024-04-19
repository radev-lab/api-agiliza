import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '~/libs';

@ValidatorConstraint({ async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(birthDateTimestamp: number): boolean {
    const birthDate = new Date(birthDateTimestamp * 1000);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18; // Aqui estamos verificando se a pessoa tem pelo menos 18 anos.
  }

  defaultMessage(): string {
    return 'Você deve ter pelo menos 18 anos.';
  }
}

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdultConstraint,
    });
  };
}
