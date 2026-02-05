"use client";

import styles from "./headlineBlock.module.scss";

interface HeadlineBlockProps {
  headline: string;
  onClick: () => void;
}

export default function HeadlineBlock({
  headline,
  onClick,
}: HeadlineBlockProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>{headline}</h1>
      <button className={styles.close} onClick={onClick}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.0964 5.63087C15.3494 5.88382 15.3494 6.29394 15.0964 6.54689L11.2797 10.3637L15.0964 14.1804C15.3494 14.4334 15.3494 14.8435 15.0964 15.0965C14.8435 15.3494 14.4334 15.3494 14.1804 15.0965L10.3636 11.2797L6.54688 15.0965C6.29392 15.3494 5.88381 15.3494 5.63085 15.0965C5.3779 14.8435 5.3779 14.4334 5.63085 14.1804L9.44762 10.3637L5.63085 6.54689C5.3779 6.29394 5.3779 5.88382 5.63085 5.63087C5.88381 5.37791 6.29392 5.37791 6.54688 5.63087L10.3636 9.44763L14.1804 5.63087C14.4334 5.37791 14.8435 5.37791 15.0964 5.63087Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
