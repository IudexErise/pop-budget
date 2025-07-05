"use client";

import { useState } from "react";
import styles from "./input.module.scss";

interface InputTypes {
  placeholder: string;
  initialValue?: string | number;
}

export default function Input({ placeholder, initialValue }: InputTypes) {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setInputValue("")}>X</button>
    </div>
  );
}
