import { FormValues } from "@/types/form";
import styles from "./FormResult.module.scss";

interface FormResultProps {
  data: FormValues;
}

export default function FormResult({ data }: FormResultProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Submitted data</h2>
      <dl className={styles.list}>
        <dt className={styles.term}>First name</dt>
        <dd className={styles.value}>{data.firstName}</dd>

        <dt className={styles.term}>Email</dt>
        <dd className={styles.value}>{data.email}</dd>

        <dt className={styles.term}>Password</dt>
        <dd className={styles.value}>{"•".repeat(data.password.length)}</dd>
      </dl>
    </section>
  );
}
