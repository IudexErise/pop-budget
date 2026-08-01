"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import EnterAmount from "@components/enterAmount/enterAmount";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";

export default function Amount() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Amount" onClick={() => router.push("/record")} />
      <EnterAmount handleSave={() => router.push("/record")} />
    </div>
  );
}
