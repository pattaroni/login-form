// шифр Віженера - симетричне шифрування: один ключ для шифрування і дешифрування
const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
  "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя" +
  "0123456789!@#$%^&*()-_=+.,?";

const SECRET_KEY = "Kyryk585KB";

// direction = 1 - шифрування, direction = -1 - дешифрування
function shiftText(text: string, direction: number): string {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const index = ALPHABET.indexOf(text[i]);

    // символи, яких немає в алфавіті, залишаються без змін
    if (index === -1) {
      result += text[i];
      continue;
    }

    const shift = ALPHABET.indexOf(SECRET_KEY[i % SECRET_KEY.length]);
    const newIndex =
      (index + direction * shift + ALPHABET.length) % ALPHABET.length;
    result += ALPHABET[newIndex];
  }

  return result;
}

// C = E_K(M)
export function encrypt(text: string): string {
  return shiftText(text, 1);
}

// M = D_K(C)
export function decrypt(text: string): string {
  return shiftText(text, -1);
}
