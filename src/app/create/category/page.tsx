"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import { categories } from "../../../@const/categories";
import { Category } from "types/category";
import { recordsStore } from "@state/records";

export default function CategoryPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Select category" onClick={() => router.back()} />
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
}

export function CategoryCard({ name, color, icon: Icon }: Category) {
  const { setCategory } = recordsStore();
  const router = useRouter();

  function handleClick() {
    setCategory(name);
    router.back();
  }

  return (
    <div className={styles.categoryCard} onClick={() => handleClick()}>
      <Icon color={color} size={44} />
      <span className={styles.categoryName}>{name}</span>
    </div>
  );
}
