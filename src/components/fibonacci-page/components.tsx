import React, { FormEvent, ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./style.module.css";

export const FibonacciPage: React.FC = () => {
  const [fibArray, setFibArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState("");


  const initialFib = [1, 1];

  const setDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const calcFibArray = (index: number, initialArr: number[]) => {
    for (let i = 2; i <= index; i++) {
      initialArr[i] = initialArr[i - 1] + initialArr[i - 2];
    }

    return initialArr;
  };

  const renderFib = async (index: number, initialArr: number[]) => {
    setIsLoading(true);
    setFibArray([]);
    const fibArray = calcFibArray(index, initialArr);;

    for (let fib of fibArray) {
      setFibArray(arr => [...arr, fib]);
      await setDelay(500);
    }
    setIsLoading(false);
    setValues("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    renderFib(Number(values), initialFib);

  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          max={19}
          min={1}
          isLimitText={true}
          value={values}
          name="index"
          onChange={onChange}
          extraClass="mr-6"
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={isLoading}
          disabled={
            !values ||
            Number(values) < 1 ||
            Number(values) > 19 ||
            !Number.isInteger(Number(values))
          }
        />
      </form>
      {fibArray && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {fibArray.map((item, index) => (
              <li key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
