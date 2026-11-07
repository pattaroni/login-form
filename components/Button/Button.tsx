import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  classname?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  type = "button",
  classname,
  disabled = false,
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles.button} ${classname ?? ""}`}
      >
        {children}
      </button>
    </>
  );
}
