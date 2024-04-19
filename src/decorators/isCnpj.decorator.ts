import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from '~/libs';

// Cálculo validador
function validCalc(x: number, numbers: string): number {
  let factor = x - 7;
  let sum = 0;

  for (let i = x; i >= 1; i--) {
    const n = Number(numbers[x - i]);
    sum += n * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);

  return result > 9 ? 0 : result;
}

export const validateCnpj = (cnpj: string): boolean => {
  if (!cnpj) return false;

  // Elimina tudo que não é dígito
  const numbers = cnpj.replace(/\D/g, '');

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false;

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  // Separa os 2 últimos dígitos verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const firstDigit = validCalc(12, numbers);
  if (firstDigit !== Number(digits[0])) return false;

  // Valida 2o. dígito verificador
  const digit1 = validCalc(13, numbers);
  return digit1 === Number(digits[1]);
};

@ValidatorConstraint({ async: false })
export class IsValidCNPJConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string): boolean {
    return validateCnpj(cnpj);
  }

  defaultMessage(): string {
    return 'O CNPJ fornecido é inválido.';
  }
}

export function IsValidCNPJ(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCNPJConstraint,
    });
  };
}
