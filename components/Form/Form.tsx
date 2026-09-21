import { FormValues } from "@/types/form";
import React, { useState } from "react";
import styles from "./Form.module.scss";

interface FormProps {
  setForm: (data: FormValues) => void;
}

export default function Form({ setForm }: FormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setForm({
      firstName: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    form.reset();
  };

  const handleChange = () => {
    setShowPassword((v) => !v);
  };

  return (
    <>
      <section className={styles.section}>
        <form className={styles.form} name="form" onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Personal Information</legend>

            <label htmlFor="name" className={styles.label}>
              First name:
            </label>
            <input type="text" name="name" required className={styles.input} />

            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              className={styles.input}
            />

            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className={styles.input}
            />

            <label>
              <input
                type="checkbox"
                name="show"
                checked={showPassword}
                onChange={handleChange}
              />
              Show/Hide Password
            </label>
          </fieldset>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
