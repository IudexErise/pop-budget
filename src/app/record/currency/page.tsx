"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import { recordsStore } from "@state/records";

type Currency = "USD" | "GEL" | "RUB";

const currencies: { icon: string; name: Currency }[] = [
  { icon: "$", name: "USD" },
  { icon: "₾", name: "GEL" },
  { icon: "₽", name: "RUB" },
];

export default function CurrencyPage() {
  const router = useRouter();
  const { setCurrency } = recordsStore();

  function handleSelectCurrency(currency: Currency) {
    setCurrency(currency);
    router.back();
  }

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Select currency" onClick={() => router.back()} />

      {currencies.map(({ icon, name }) => (
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
  name: Currency;
  onClick: (currency: Currency) => void;
}

function CurrencyCard({ icon, name, onClick }: CurrencyCardProps) {
  return (
    <div className={styles.currencyCard} onClick={() => onClick(name)}>
      <span className={styles.currencyIcon}>{icon}</span>
      <span className={styles.currencyName}>{name}</span>
    </div>
  );
}
