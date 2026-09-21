"use client";

import Form from "@/components/Form/Form";
import FormResult from "@/components/FormResult/FormResult";
import { FormValues } from "@/types/form";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState<FormValues | null>(null);

  return (
    <>
      <div className="container">
        <Form setForm={setForm} />
        {form && <FormResult data={form} />}
      </div>
    </>
  );
}
