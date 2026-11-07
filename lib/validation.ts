import { FieldName, FormErrors, FormValues } from "@/types/form";

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

type ValidationRules = Record<FieldName, ValidationRule[]>;

const LETTERS_ONLY = /^[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]+$/;
const STARTS_WITH_CAPITAL = /^[A-ZА-ЩЬЮЯҐЄІЇ]/;
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UPPERCASE = /[A-ZА-ЯҐЄІЇ]/;
const LOWERCASE = /[a-zа-яґєії]/;
const DIGIT = /[0-9]/;
const SPECIAL_CHAR = /[^A-Za-zА-Яа-яЁёҐґЄєІіЇї0-9\s]/;

const required = (value: string) => value.trim() !== "";

const nameRules: ValidationRule[] = [
  { test: required, message: "Поле обов'язкове для заповнення" },
  {
    test: (value) => LETTERS_ONLY.test(value),
    message: "Допускаються лише українські чи англійські літери",
  },
  {
    test: (value) => STARTS_WITH_CAPITAL.test(value),
    message: "Має починатися з великої літери",
  },
];

// об'єкт з усіма правилами валідації
export const validationRules: ValidationRules = {
  firstName: nameRules,
  lastName: nameRules,
  email: [
    { test: required, message: "Поле обов'язкове для заповнення" },
    {
      test: (value) => EMAIL_FORMAT.test(value),
      message: "Невірний формат e-mail",
    },
  ],
  password: [
    { test: required, message: "Поле обов'язкове для заповнення" },
    {
      test: (value) => value.length >= 8,
      message: "Пароль має містити мінімум 8 символів",
    },
    {
      test: (value) => UPPERCASE.test(value),
      message: "Пароль має містити хоча б одну велику літеру",
    },
    {
      test: (value) => LOWERCASE.test(value),
      message: "Пароль має містити хоча б одну маленьку літеру",
    },
    {
      test: (value) => DIGIT.test(value),
      message: "Пароль має містити хоча б одну цифру",
    },
    {
      test: (value) => SPECIAL_CHAR.test(value),
      message: "Пароль має містити хоча б один спеціальний символ (!@#$%^&*)",
    },
  ],
};

// клас валідації - використовує об'єкт з правилами
export class FormValidator {
  private rules: ValidationRules;

  constructor(rules: ValidationRules) {
    this.rules = rules;
  }

  // повертає текст першої помилки або порожній рядок, якщо поле валідне
  validateField(field: FieldName, value: string): string {
    for (const rule of this.rules[field]) {
      if (!rule.test(value)) {
        return rule.message;
      }
    }
    return "";
  }

  validateAll(values: FormValues): FormErrors {
    return {
      firstName: this.validateField("firstName", values.firstName),
      lastName: this.validateField("lastName", values.lastName),
      email: this.validateField("email", values.email),
      password: this.validateField("password", values.password),
    };
  }

  isValid(values: FormValues): boolean {
    const errors = this.validateAll(values);
    return Object.values(errors).every((message) => message === "");
  }
}

export const validator = new FormValidator(validationRules);
