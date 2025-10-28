"use client";

import styles from "./select.module.scss";

interface SelectTypes {
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export default function Select({
  label,
  options,
  value,
  setValue,
}: SelectTypes) {
  return (
    <div className={styles.container}>
      <label>
        {label}
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
