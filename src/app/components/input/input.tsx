"use client";

import styles from "./input.module.scss";

interface InputTypes {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  type: string;
}

export default function Input({
  placeholder,
  value,
  setValue,
  type,
}: InputTypes) {
  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
      />
      <button onClick={() => setValue("")}>X</button>
    </div>
  );
}
