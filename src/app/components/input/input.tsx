"use client";

import styles from "./input.module.scss";

interface InputTypes {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

export default function Input({ placeholder, value, setValue }: InputTypes) {
  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setValue("")}>X</button>
    </div>
  );
}
