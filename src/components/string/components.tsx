import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates, ElementTypes } from "../../types/element-states";
import style from "./style.module.css";
import { Circle } from "../ui/circle/circle";
import { nanoid } from 'nanoid'

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<Array<ElementTypes>>();

  const swap = (
    value: ElementTypes[],
    firstItem: number,
    secondItem: number
  ) => {
    return ([value[firstItem], value[secondItem]] = [
      value[secondItem],
      value[firstItem],
    ]);
  };

  function setDelay(delay: number) {
    return new Promise<void>((res) => setTimeout(res, delay));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArray = inputValue.split("").map((letter: string) => {
      return { letter, state: ElementStates.Default };
    });
    setArray(newArray);
    setLoader(true);
    const endString = newArray.length - 1;
    const middleString = Math.ceil(newArray.length / 2);

    for (let i = 0; i < middleString; i++) {
      let j = endString - i;

      if (i !== j) {
        newArray[i].state = ElementStates.Changing;
        newArray[j].state = ElementStates.Changing;
        setArray([...newArray]);
        await setDelay(1000);
      }
      swap(newArray, i, j);

      newArray[i].state = ElementStates.Modified;
      newArray[j].state = ElementStates.Modified;

      setArray([...newArray]);
    }

    setLoader(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText
          onChange={onChange}
          value={inputValue}
        />
        <Button
          text="Развернуть"
          isLoader={loader}
          type="submit"
          disabled={!!!inputValue}
        />
      </form>
      <ul className={style.ul}>
        {array?.map((item) => (
          <Circle key={nanoid()} letter={item.letter} state={item.state} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
