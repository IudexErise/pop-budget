"use client";

/* import styles from "./calendar.module.scss"; */

interface CalendarProps {
  label?: string;
  value: number;
  setValue: (v: number) => void;
  max?: string;
}

export default function Calendar({
  label,
  value,
  setValue,
  max,
}: CalendarProps) {
  const formatted = new Date(value).toISOString().split("T")[0];

  return (
    <label>
      {label}
      <input
        type="date"
        value={formatted}
        onChange={(e) => {
          setValue(new Date(e.target.value).getTime());
        }}
        max={max}
      />
    </label>
  );
}
