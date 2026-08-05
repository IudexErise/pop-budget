import axios from "axios";

export async function convertCurrency(
  currency: string,
  amount: string,
  date: number,
) {
  try {
    const dateInfo = new Date(date);
    const year = dateInfo.getFullYear();
    const month = String(dateInfo.getMonth() + 1).padStart(2, "0");
    const day = String(dateInfo.getDate()).padStart(2, "0");
    const ApiKey = "fca_live_1uVA8cWfSKDJh2Eg79D0mTDcGvYsWfBZS34ZQj36";
    let res;
    if (dateInfo.toLocaleDateString() === new Date().toLocaleDateString()) {
      res = await axios.get(
        `https://api.currencyapi.com/v3/latest?apikey=${ApiKey}&currencies=USD&base_currency=${currency}`,
      );
    } else {
      res = await axios.get(
        `https://api.currencyapi.com/v3/historical?apikey=${ApiKey}&currencies=USD&base_currency=${currency}&date=${year}-${month}-${day}`,
      );
    }
    return (res.data.data.USD.value * Number(amount)).toFixed(2);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.errors?.date?.[0] || "Ошибка";
      alert(message);
      return "0";
    }
    alert("Неизвестная ошибка");
    return "0";
  }
}

export function formatAmount(
  value: number | string,
  options?: Intl.NumberFormatOptions,
  locale = "en-US",
) {
  return Number(value).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
}
