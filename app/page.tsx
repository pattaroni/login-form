"use client";

import Form from "@/components/Form/Form";
import FormResult from "@/components/FormResult/FormResult";
import LoginForm from "@/components/LoginForm/LoginForm";
import { addUser } from "@/lib/storage";
import { FormValues } from "@/types/form";
import { useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState<FormValues | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState("");

  // після реєстрації дані шифруються і зберігаються в Local Storage
  const handleRegister = (data: FormValues) => {
    if (!addUser(data)) {
      setError("Користувач з таким email вже існує");
      return;
    }
    setError("");
    setForm(data);
  };

  const clearForm = () => {
    setForm(null);
    setFormKey((k) => k + 1);
    setTab("login");
  };

  return (
    <div className="container">
      <div className={styles.tabs}>
        <button
          className={tab === "login" ? styles.active : styles.tab}
          onClick={() => setTab("login")}
        >
          Log in
        </button>
        <button
          className={tab === "register" ? styles.active : styles.tab}
          onClick={() => setTab("register")}
        >
          Registration
        </button>
      </div>

      {tab === "login" && <LoginForm />}

      {tab === "register" && (
        <>
          <Form key={formKey} setForm={handleRegister} />
          <p className={styles.error}>{error}</p>
        </>
      )}

      {form && <FormResult data={form} clearForm={clearForm} />}
    </div>
  );
}
