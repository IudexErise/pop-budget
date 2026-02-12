"use client";

import { useRouter } from "next/navigation";
import Calendar from "../../@components/calendar/calendar";
import Input from "../../@components/input/input";
import styles from "./page.module.scss";
import { recordsStore } from "../../@state/records";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import { getSelectedCategory } from "@const/categories";
import { CSSProperties } from "react";

export default function Create() {
  const {
    amount,
    description,
    subCategory,
    setDescription,
    date,
    setDate,
    addRecord,
    category,
    currency,
    setSubCategory,
  } = recordsStore();

  const router = useRouter();

  function handleSave() {
    addRecord();
    router.push("/");
  }

  const selectedCategory = getSelectedCategory(category);

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Create" onClick={() => router.back()} />
      <div
        className={styles.amountBlock}
        onClick={() => router.push("create/amount")}
      >
        <span className={styles.subText}>Expense</span>
        <div className={styles.amount}>{amount === "" ? 0 : amount}</div>
      </div>

      <section
        className={styles.section}
        onClick={() => router.push("create/currency")}
      >
        <div className={styles.sectionText}>
          <p className={styles.subText}>Currency</p>
          <p className={styles.text__uppercase}>{currency}</p>
        </div>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="9" fill="white" fillOpacity="0.05" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1696 14.25L28.8304 14.25C29.3646 14.25 29.8104 14.25 30.1747 14.2797C30.5546 14.3108 30.9112 14.3779 31.2485 14.5497C31.7659 14.8134 32.1866 15.2341 32.4503 15.7515C32.6221 16.0888 32.6892 16.4454 32.7203 16.8253C32.75 17.1896 32.75 17.6354 32.75 18.1695V25.8305C32.75 26.3646 32.75 26.8104 32.7203 27.1747C32.6892 27.5546 32.6221 27.9112 32.4503 28.2485C32.1866 28.7659 31.7659 29.1866 31.2485 29.4503C30.9112 29.6221 30.5546 29.6892 30.1747 29.7203C29.8104 29.75 29.3646 29.75 28.8305 29.75L15.1695 29.75C14.6354 29.75 14.1896 29.75 13.8253 29.7203C13.4454 29.6892 13.0888 29.6221 12.7515 29.4503C12.2341 29.1866 11.8134 28.7659 11.5497 28.2485C11.3779 27.9112 11.3108 27.5546 11.2797 27.1747C11.25 26.8104 11.25 26.3646 11.25 25.8304L11.25 20.0005C11.25 20.0004 11.25 20.0007 11.25 20.0005C11.25 20.0004 11.25 19.9996 11.25 19.9995L11.25 18.1696C11.25 17.6354 11.25 17.1896 11.2797 16.8253C11.3108 16.4454 11.3779 16.0888 11.5497 15.7515C11.8134 15.2341 12.2341 14.8134 12.7515 14.5497C13.0888 14.3779 13.4454 14.3108 13.8253 14.2797C14.1896 14.25 14.6354 14.25 15.1696 14.25ZM12.75 20.75L12.75 25.8C12.75 26.3724 12.7506 26.7566 12.7748 27.0525C12.7982 27.3396 12.8401 27.4769 12.8862 27.5675C13.0061 27.8027 13.1973 27.9939 13.4325 28.1138C13.5231 28.1599 13.6604 28.2018 13.9475 28.2252C14.2434 28.2494 14.6276 28.25 15.2 28.25L28.8 28.25C29.3724 28.25 29.7566 28.2494 30.0525 28.2252C30.3396 28.2018 30.4769 28.1599 30.5675 28.1138C30.8027 27.9939 30.9939 27.8027 31.1138 27.5675C31.1599 27.4769 31.2018 27.3396 31.2252 27.0525C31.2494 26.7566 31.25 26.3724 31.25 25.8V20.75H12.75ZM31.25 19.25H12.75V18.2C12.75 17.6276 12.7506 17.2434 12.7748 16.9475C12.7982 16.6604 12.8401 16.5231 12.8862 16.4325C13.0061 16.1973 13.1973 16.0061 13.4325 15.8862C13.5231 15.8401 13.6604 15.7982 13.9475 15.7748C14.2434 15.7506 14.6276 15.75 15.2 15.75L28.8 15.75C29.3724 15.75 29.7566 15.7506 30.0525 15.7748C30.3396 15.7982 30.4769 15.8401 30.5675 15.8862C30.8027 16.0061 30.9939 16.1973 31.1138 16.4325C31.1599 16.5231 31.2018 16.6604 31.2252 16.9475C31.2494 17.2434 31.25 17.6276 31.25 18.2V19.25ZM15.25 24C15.25 23.5858 15.5858 23.25 16 23.25H21C21.4142 23.25 21.75 23.5858 21.75 24C21.75 24.4142 21.4142 24.75 21 24.75H16C15.5858 24.75 15.25 24.4142 15.25 24Z"
            fill="white"
          />
        </svg>
      </section>

      <section
        className={styles.section}
        onClick={() => router.push("create/category")}
      >
        <div className={styles.sectionText}>
          <p className={styles.subText}>Category</p>
          <p className={styles.text} style={{ color: selectedCategory?.color }}>
            {category}
          </p>
        </div>
        {selectedCategory && (
          <selectedCategory.icon color={selectedCategory.color} size={44} />
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionText}>
          <p className={styles.subText}>Subcategory</p>
          <div className={styles.subCategories}>
            {selectedCategory &&
              selectedCategory.subCategories.map((subCat) => (
                <div
                  key={subCat}
                  className={
                    subCat === subCategory
                      ? styles.subCategoryActive
                      : styles.subCategory
                  }
                  onClick={() => setSubCategory(subCat)}
                  style={
                    {
                      "--color": `${selectedCategory.color}`,
                    } as CSSProperties
                  }
                >
                  <selectedCategory.icon
                    color={selectedCategory.color}
                    size={24}
                  />
                  <span>{subCat}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div>
        <Calendar
          label="purchase date"
          value={date}
          setValue={setDate}
          max={new Date().toISOString().split("T")[0]}
        />
        <Input
          placeholder="comment"
          value={description}
          setValue={setDescription}
          type="text"
        />
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </div>
  );
}
