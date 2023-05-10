export interface GeneratePasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export const defaultPasswordOptions: GeneratePasswordOptions = {
  length: 10,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
}

export function generatePassword(options: Partial<GeneratePasswordOptions>): string {
  const mergedOptions: GeneratePasswordOptions = {
    ...defaultPasswordOptions,
    ...options
  }

  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=-';

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