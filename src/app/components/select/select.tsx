"use client";

import { useState } from "react";
import styles from "./select.module.scss";

interface SelectTypes {
  label: string;
  options: string[];
}

export default function Select({ label, options }: SelectTypes) {
  const [selectValue, setSelectValue] = useState("no category");

  const optionsList = options.map((option, index) => (
    <option key={index} onClick={() => setSelectValue(option)}>
      {option}
    </option>
  ));

  return (
    <div className={styles.container}>
      <label>
        {label}
        <select>
          <option onClick={() => setSelectValue("no category")}>
            {selectValue}
          </option>
          {optionsList}
        </select>
      </label>
    </div>
  );
}
