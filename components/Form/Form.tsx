"use client";

import { FieldName, FormTouched, FormValues } from "@/types/form";
import React, { useState } from "react";
import styles from "./Form.module.scss";
import { Button } from "../Button/Button";
import { validator } from "@/lib/validation";

interface FormProps {
  setForm: (data: FormValues) => void;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialTouched: FormTouched = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

export default function Form({ setForm }: FormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<FormTouched>(initialTouched);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // помилки перераховуються після кожної зміни значень
  const errors = validator.validateAll(values);
  const isFormValid = validator.isValid(values);

  // жива валідація: onChange у React спрацьовує на кожну подію input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as FieldName;
    const value = e.target.value;

    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // форма відправляється тільки якщо всі поля пройшли валідацію
    if (!validator.isValid(values)) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      });
      return;
    }

    console.log("Дані форми:", values);
    setForm(values);
  };

  const handleChange = () => {
    setShowPassword((v) => !v);
  };

  // зелена рамка для валідного поля, червона - для невалідного
  const getInputClass = (field: FieldName) => {
    if (!touched[field]) {
      return styles.input;
    }
    return `${styles.input} ${errors[field] ? styles.invalid : styles.valid}`;
  };

  const getError = (field: FieldName) => (touched[field] ? errors[field] : "");

  return (
    <>
      <section className={styles.section}>
        <form
          className={styles.form}
          name="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Personal Information</legend>

            <label htmlFor="firstName" className={styles.label}>
              First name:
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Oleksii"
              value={values.firstName}
              onChange={handleInput}
              className={getInputClass("firstName")}
            />
            <p className={styles.error}>{getError("firstName")}</p>

            <label htmlFor="lastName" className={styles.label}>
              Last name:
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Kyryk"
              value={values.lastName}
              onChange={handleInput}
              className={getInputClass("lastName")}
            />
            <p className={styles.error}>{getError("lastName")}</p>

            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@example.com"
              value={values.email}
              onChange={handleInput}
              className={getInputClass("email")}
            />
            <p className={styles.error}>{getError("email")}</p>

            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Min 8 characters"
              value={values.password}
              onChange={handleInput}
              className={getInputClass("password")}
            />
            <p className={styles.error}>{getError("password")}</p>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="show"
                checked={showPassword}
                onChange={handleChange}
              />
              Show/Hide Password
            </label>
          </fieldset>
          <Button type="submit" disabled={!isFormValid}>
            Submit
          </Button>
        </form>
      </section>
    </>
  );
}
