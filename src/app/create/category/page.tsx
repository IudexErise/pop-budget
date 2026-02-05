"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";

export default function Category() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Select category" onClick={() => router.back()} />
    </div>
  );
}
