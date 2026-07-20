"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import AllRecords from "@components/allRecords/allRecords";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";

export default function Records() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Records" onClick={() => router.back()} />
      <AllRecords />
    </div>
  );
}
