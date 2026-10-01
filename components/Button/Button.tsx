import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  classname?: string;
}

export function Button({
  children,
  onClick,
  type = "button",
  classname,
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${classname}`}
      >
        {children}
      </button>
    </>
  );
}
