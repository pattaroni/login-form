"use client";

import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  classname?: string;
}

export function Modal({ children, onClose, classname }: ModalProps) {
  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`${styles.modalContent} ${classname}`}>{children}</div>
    </div>,
    document.body,
  );
}
