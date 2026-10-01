"use client";

import Form from "@/components/Form/Form";
import FormResult from "@/components/FormResult/FormResult";
import { FormValues } from "@/types/form";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState<FormValues | null>(null);
  const [formKey, setFormKey] = useState(0);

  const clearForm = () => {
    setForm(null);
    setFormKey((k) => k + 1);
  };

  return (
    <>
      <div className="container">
        <Form key={formKey} setForm={setForm} />
        {form && <FormResult data={form} clearForm={clearForm} />}
      </div>
    </>
  );
}
