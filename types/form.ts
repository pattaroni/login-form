export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type FieldName = keyof FormValues;

export type FormErrors = Record<FieldName, string>;

export type FormTouched = Record<FieldName, boolean>;
