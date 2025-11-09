"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Calendar from "../@components/calendar/calendar";
import Input from "../@components/input/input";
import Select from "../@components/select/select";
import { recordsStore } from "../@state/records";
import { useEffect } from "react";
import { editRecordStore } from "app/@state/editRecord";

export default function Edit() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { records } = recordsStore();

  const {
    amount,
    setAmount,
    convertedAmount,
    setConvertedAmount,
    description,
    setDescription,
    date,
    setDate,
    setCurrency,
    category,
    setCategory,
    saveChanges,
    setRecordId,
  } = editRecordStore();

  useEffect(() => {
    const recordId = searchParams.get("id");
    if (!recordId) {
      router.push("/");
      return;
    }

    const editedRecord = records.find((el) => el.id === Number(recordId));
    if (!editedRecord) {
      router.push("/");
      return;
    }

    setRecordId(editedRecord.id);
    setAmount(editedRecord.amount);
    setConvertedAmount(editedRecord.convertedAmount);
    setDescription(editedRecord.description);
    setCurrency(editedRecord.currency);
    setCategory(editedRecord.category);
    setDate(editedRecord.date);
  }, [
    records,
    searchParams,
    setRecordId,
    setAmount,
    setConvertedAmount,
    setDescription,
    setCurrency,
    setCategory,
    setDate,
    router,
  ]);

  function handleSave() {
    saveChanges();
    router.push("/");
  }

  return (
    <main>
      <h1>Edit</h1>
      <div>
        <Input
          placeholder="Amount"
          value={amount}
          setValue={setAmount}
          type="number"
        />
        <Input
          placeholder="Converted amount"
          value={convertedAmount}
          setValue={setConvertedAmount}
          type="number"
          readonly={true}
        />
        <Calendar
          label="Purchase date"
          value={date}
          setValue={setDate}
          max={new Date().toISOString().split("T")[0]}
        />
        <Select
          label="Category"
          options={["", "food", "drink", "delivery"]}
          value={category}
          setValue={setCategory}
        />
        <Input
          placeholder="Comment"
          value={description}
          setValue={setDescription}
          type="text"
        />
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </main>
  );
}
