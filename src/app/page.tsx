"use client";

import { useRouter } from "next/navigation";
/* import styles from "./page.module.scss"; */

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <h1>Main page</h1>
      <button onClick={() => router.push("/create")}>Create</button>
    </main>
  );
}
