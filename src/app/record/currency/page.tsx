"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import { recordsStore } from "@state/records";
import { currenciesList } from "@const/currencies";

export default function CurrencyPage() {
  const router = useRouter();
  const { setCurrency } = recordsStore();

  function handleSelectCurrency(currency: string) {
    setCurrency(currency);
    router.back();
  }

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Select currency" onClick={() => router.back()} />

      {currenciesList.map(({ icon, name }) => (
        <CurrencyCard
          key={name}
          icon={icon}
          name={name}
          onClick={handleSelectCurrency}
        />
      ))}
    </div>
  );
}

interface CurrencyCardProps {
  icon: string;
  name: string;
  onClick: (currency: string) => void;
}

function CurrencyCard({ icon, name, onClick }: CurrencyCardProps) {
  return (
    <div className={styles.currencyCard} onClick={() => onClick(name)}>
      <span className={styles.currencyIcon}>{icon}</span>
      <span className={styles.currencyName}>{name}</span>
    </div>
  );
}
