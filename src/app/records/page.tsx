"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import AllRecords from "@components/allRecords/allRecords";

export default function Records() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h1>Records</h1>
        <button onClick={() => router.push(`/create`)}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.3636 3.67047C10.7213 3.67047 11.0113 3.96047 11.0113 4.3182V9.71593H16.409C16.7668 9.71593 17.0568 10.0059 17.0568 10.3637C17.0568 10.7214 16.7668 11.0114 16.409 11.0114H11.0113V16.4091C11.0113 16.7668 10.7213 17.0568 10.3636 17.0568C10.0059 17.0568 9.71586 16.7668 9.71586 16.4091V11.0114H4.31814C3.96041 11.0114 3.67041 10.7214 3.67041 10.3637C3.67041 10.0059 3.96041 9.71593 4.31814 9.71593H9.71586V4.3182C9.71586 3.96047 10.0059 3.67047 10.3636 3.67047Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div>
        <AllRecords />
      </div>
    </div>
  );
}
