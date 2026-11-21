"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Form/Form.module.scss";
import { Button } from "../Button/Button";
import { getUsers, setSession } from "@/lib/storage";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // 1. перевірка адміністратора через API (дані в БД)
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setSession({ role: "admin", name: data.name });
      router.push("/admin");
      return;
    }

    // 2. перевірка користувачів з Local Storage (після дешифрування)
    const users = getUsers();
    for (const user of users) {
      if (user.email === email && user.password === password) {
        setSession({ role: "user", name: user.firstName });
        router.push("/user");
        return;
      }
    }

    setError("Невірний email або пароль");
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Log in</legend>

          <label htmlFor="loginEmail" className={styles.label}>
            Email:
          </label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <label htmlFor="loginPassword" className={styles.label}>
            Password:
          </label>
          <input
            id="loginPassword"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((v) => !v)}
            />
            Show/Hide Password
          </label>

          <p className={styles.error}>{error}</p>
        </fieldset>
        <Button type="submit" disabled={!email || !password}>
          Log in
        </Button>
      </form>
    </section>
  );
}
