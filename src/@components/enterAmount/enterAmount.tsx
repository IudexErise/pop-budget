"use client";

import { recordsStore } from "@state/records";
import styles from "./enterAmount.module.scss";
import { useMemo, useState } from "react";
import { Parser } from "expr-eval";

interface EnterAmountProps {
  handleSave: () => void;
}

type ButtonInput = number | "." | "del" | "+" | "-" | "*" | "/";

const BUTTONS: ButtonInput[] = [
  1,
  2,
  3,
  "+",
  4,
  5,
  6,
  "-",
  7,
  8,
  9,
  "*",
  ".",
  0,
  "del",
  "/",
];

const OPERATORS = ["+", "-", "*", "/"];

export default function EnterAmount({ handleSave }: EnterAmountProps) {
  const { amount, setAmount } = recordsStore();
  const [expression, setExpression] = useState(amount);

  function addDigit(digit: number) {
    if (expression === "0") {
      setExpression(String(digit));
      return;
    }

    setExpression((prev) => prev + digit);
  }

  function addOperator(operator: string) {
    if (expression === "") return;

    const last = expression.at(-1);

    if (last && OPERATORS.includes(last)) {
      setExpression((prev) => prev.slice(0, -1) + operator);
      return;
    }

    setExpression((prev) => prev + operator);
  }

  function addDot() {
    const currentOperand = expression.split(/[+\-*/]/).at(-1) ?? "";

    if (currentOperand === "") {
      setExpression((prev) => prev + "0.");
      return;
    }

    if (!currentOperand.includes(".")) {
      setExpression((prev) => prev + ".");
    }
  }

  function removeLast() {
    setExpression((prev) => prev.slice(0, -1));
  }

  function handleButtonClick(value: ButtonInput) {
    if (typeof value === "number") {
      addDigit(value);
      return;
    }

    switch (value) {
      case ".":
        addDot();
        break;

      case "del":
        removeLast();
        break;

      default:
        addOperator(value);
    }
  }

  const preview = useMemo(() => {
    const parser = new Parser();
    try {
      const value = parser.evaluate(expression);
      return Number.isFinite(value) ? value : null;
    } catch {
      return null;
    }
  }, [expression]);

  function handleSubmit() {
    if (preview === null) return;

    setAmount(String(preview));
    setExpression("");
    handleSave();
  }

  return (
    <div className={styles.container}>
      <div className={styles.amountContainer}>
        <div className={styles.amount}>{expression || "0"}</div>
        {expression !== "" && preview !== null ? (
          <div className={styles.result}>={preview}</div>
        ) : (
          <div className={styles.result}>=</div>
        )}
      </div>
      <div className={styles.buttons}>
        {BUTTONS.map((button) => (
          <button
            key={button}
            className={styles.button}
            onClick={() => handleButtonClick(button)}
          >
            {button === "*" ? (
              "×"
            ) : button === "/" ? (
              "÷"
            ) : button === "del" ? (
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.01243 3.84507e-05C8.04126 5.82395e-05 8.07045 7.83263e-05 8.1 7.83263e-05L15.7321 7.80878e-05C16.5449 7.06969e-05 17.2006 6.46785e-05 17.7315 0.0434417C18.2781 0.0881037 18.7582 0.182463 19.2025 0.408804C19.9081 0.768329 20.4817 1.34201 20.8413 2.04761C21.0676 2.49183 21.162 2.97197 21.2066 3.51861C21.25 4.04952 21.25 4.70512 21.25 5.51795V11.9822C21.25 12.795 21.25 13.4506 21.2066 13.9815C21.162 14.5282 21.0676 15.0083 20.8413 15.4525C20.4817 16.1582 19.9081 16.7318 19.2025 17.0914C18.7582 17.3177 18.2781 17.4121 17.7315 17.4567C17.2006 17.5001 16.545 17.5001 15.7321 17.5001H8.1C8.07044 17.5001 8.04126 17.5001 8.01243 17.5001C7.51138 17.5005 7.1173 17.5007 6.74481 17.3944C6.41693 17.3007 6.10933 17.1469 5.83769 16.9408C5.5291 16.7066 5.29286 16.3912 4.99251 15.9902C4.97522 15.9671 4.95773 15.9437 4.94 15.9201L0.62 10.1601C0.602774 10.1371 0.585363 10.114 0.567854 10.0908C0.363628 9.82017 0.146225 9.53204 0.0576537 9.19557C-0.0192179 8.90355 -0.0192179 8.59661 0.0576537 8.30459C0.146225 7.96812 0.363627 7.67999 0.567852 7.40933C0.585362 7.38612 0.602774 7.36305 0.62 7.34008L4.94 1.58008C4.95773 1.55643 4.97523 1.53307 4.99251 1.51C5.29286 1.10896 5.5291 0.793524 5.83769 0.559362C6.10933 0.353244 6.41693 0.199443 6.74481 0.105804C7.1173 -0.000576846 7.51138 -0.000305945 8.01243 3.84507e-05ZM8.1 1.50008C7.46986 1.50008 7.30127 1.50685 7.15673 1.54814C7.0077 1.5907 6.86788 1.66061 6.74441 1.7543C6.62466 1.84516 6.51808 1.97597 6.14 2.48008L1.82 8.24008C1.68465 8.42055 1.60664 8.52528 1.55354 8.60759C1.52099 8.65804 1.51042 8.68138 1.50789 8.68775C1.49737 8.72864 1.49737 8.77152 1.50789 8.81241C1.51042 8.81878 1.52099 8.84211 1.55354 8.89257C1.60664 8.97487 1.68465 9.07961 1.82 9.26008L6.14 15.0201C6.51808 15.5242 6.62466 15.655 6.74441 15.7459C6.86788 15.8395 7.0077 15.9095 7.15673 15.952C7.30127 15.9933 7.46986 16.0001 8.1 16.0001H15.7C16.5525 16.0001 17.1467 15.9995 17.6093 15.9617C18.0632 15.9246 18.324 15.8555 18.5215 15.7548C18.9448 15.5391 19.289 15.1949 19.5048 14.7716C19.6054 14.574 19.6745 14.3133 19.7116 13.8594C19.7494 13.3968 19.75 12.8025 19.75 11.9501V5.55008C19.75 4.69762 19.7494 4.10339 19.7116 3.64076C19.6745 3.18688 19.6054 2.92612 19.5048 2.7286C19.289 2.30524 18.9448 1.96103 18.5215 1.74531C18.324 1.64467 18.0632 1.57554 17.6093 1.53846C17.1467 1.50066 16.5525 1.50008 15.7 1.50008H8.1ZM1.50723 8.81054C1.50726 8.81056 1.50758 8.81137 1.50789 8.81241L1.50723 8.81054ZM1.50723 8.68961C1.5072 8.68964 1.50745 8.68888 1.50789 8.68775L1.50723 8.68961ZM8.96967 5.21975C9.26256 4.92686 9.73744 4.92686 10.0303 5.21975L12.5 7.68942L14.9697 5.21975C15.2626 4.92686 15.7374 4.92686 16.0303 5.21975C16.3232 5.51264 16.3232 5.98751 16.0303 6.28041L13.5607 8.75008L16.0303 11.2197C16.3232 11.5126 16.3232 11.9875 16.0303 12.2804C15.7374 12.5733 15.2626 12.5733 14.9697 12.2804L12.5 9.81074L10.0303 12.2804C9.73744 12.5733 9.26256 12.5733 8.96967 12.2804C8.67678 11.9875 8.67678 11.5126 8.96967 11.2197L11.4393 8.75008L8.96967 6.28041C8.67678 5.98751 8.67678 5.51264 8.96967 5.21975Z"
                  fill="white"
                />
              </svg>
            ) : (
              button
            )}
          </button>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        {" "}
        <button
          className={styles.reset}
          onClick={() => {
            setExpression("");
          }}
        >
          Reset
        </button>{" "}
        <button
          className={styles.save}
          onClick={handleSubmit}
          disabled={preview === null}
        >
          Save
        </button>
      </div>
    </div>
  );
}
