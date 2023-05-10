export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export const defaultPasswordOptions: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
}

const characters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=-';

export function password(options: Partial<PasswordOptions>): string {
  const mergedOptions: PasswordOptions = {
    ...defaultPasswordOptions,
    ...options
  }

  let chars = '';

  if (mergedOptions.includeUppercase) {
    chars += characters.toUpperCase();
  }

  if (mergedOptions.includeLowercase) {
    chars += characters;
  }

  if (mergedOptions.includeNumbers) {
    chars += numbers;
  }

  if (mergedOptions.includeSymbols) {
    chars += symbols;
  }

  let generatedPassword = '';

  for (let i = 0; i < mergedOptions.length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    generatedPassword += chars[index];
  }

  return generatedPassword;
}

export function passwordToOptions(passwordText: string): PasswordOptions {
  const options: PasswordOptions = {
    length: 0,
    includeUppercase: false,
    includeLowercase: false,
    includeNumbers: false,
    includeSymbols: false,
  }

  for (const char of passwordText) {
    if (characters.includes(char)) {
      options.includeLowercase = true;
    } else if (characters.toUpperCase().includes(char)) {
      options.includeUppercase = true;
    } else if (numbers.includes(char)) {
      options.includeNumbers = true;
    } else if (symbols.includes(char)) {
      options.includeSymbols = true;
    }
  }

  options.length = passwordText.length;

  return options;
}