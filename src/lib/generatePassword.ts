import words from '@/assets/words.json';

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface PassphraseOptions {
  length: number;
  separator: string;
  capitalize: boolean;
  includeNumbers: boolean;
}

export const defaultPasswordOptions: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
}

export const defaultPassphraseOptions: PassphraseOptions = {
  length: 4,
  separator: '-',
  capitalize: false,
  includeNumbers: false,
}

export enum PasswordType {
  Password = 'password',
  Passphrase = 'passphrase',
}

const characters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=-';

export function generatePassword(options: Partial<PasswordOptions>): string {
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

  if (chars.length === 0) {
    return '';
  }

  let generatedPassword = '';

  for (let i = 0; i < mergedOptions.length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    generatedPassword += chars[index];
  }

  return generatedPassword;
}

function randomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generatePassphrase(options: Partial<PassphraseOptions>) {
  const mergedOptions: PassphraseOptions = {
    ...defaultPassphraseOptions,
    ...options
  }

  const words: string[] = [];

  for (let i = 0; i < mergedOptions.length; i++) {
    let word = randomWord();

    if (mergedOptions.capitalize) {
      word = capitalize(word);
    }

    if (mergedOptions.includeNumbers) {
      if (Math.random() > 0.5) {
        const number = Math.floor(Math.random() * 100);
        word += number;
      }
    }

    words.push(word);
  }

  return words.join(mergedOptions.separator);
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