"use client";

import styles from "./input.module.scss";

interface InputTypes {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type: string;
  readonly?: boolean;
}

export default function Input({
  placeholder,
  value,
  setValue,
  type,
  readonly,
}: InputTypes) {
  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        readOnly={readonly}
      />
      <button onClick={() => setValue("")} disabled={readonly}>
        X
      </button>
    </div>
  );
}
