import * as validator from 'validator';

export function is_email(param: string): boolean {
  return validator.isEmail(param);
}

export function has_lowercase(param: string): boolean {
  return RegExp(/[a-z]/g).test(param);
}

export function has_uppercase(param: string): boolean {
  return RegExp(/[A-Z]/g).test(param);
}

export function has_number(param: string): boolean {
  return RegExp(/[0-9]/g).test(param);
}

export function has_symbol(param: string): boolean {
  return RegExp(/[^a-zA-Z0-9\n]/g).test(param);
}

export const Validator = {
  is_email,
  has_lowercase,
  has_uppercase,
  has_number,
  has_symbol,
};
