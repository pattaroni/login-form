import { FormValues } from "@/types/form";
import styles from "./FormResult.module.scss";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import Image from "next/image";
import { writeName } from "@/lib/writeName";

interface FormResultProps {
  data: FormValues;
  clearForm: () => void;
}

export default function FormResult({ data, clearForm }: FormResultProps) {
  return (
    <Modal onClose={clearForm} classname={styles.modal}>
      <div className={styles.close} onClick={clearForm}>
        <Image src={"/close.svg"} width={20} height={20} alt="" />
      </div>

      <h2>Success!</h2>
      <p>Registration successful!!</p>
      <h3 className={styles.name}>
        {writeName(data.firstName).map((letter, idx) => (
          <span key={idx} className={styles.letter}>
            {letter}
          </span>
        ))}
      </h3>
      <Button classname={styles.button} onClick={clearForm}>
        Close
      </Button>
    </Modal>
  );
}
